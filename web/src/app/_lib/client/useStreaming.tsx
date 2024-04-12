// hook/useStreaming.ts
import { nanoid } from 'nanoid'
import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchEventSource } from '@microsoft/fetch-event-source'

export type Message = {
  content: string
  role: 'user' | 'computer'
  id: string
  created: string
  sources: Array<{
    pageContent: string
    metadata: {
      file: string
      url: string
      type: string
      source: string
    }
  }>
}

export type StreamListenerType = {
  onMessage: (message: string) => void
  onError: (error: Error) => void
  onStartStream: () => void
  onStopStream: () => void
}

export const useStreaming = (
  url: string,
  headers?: Record<string, string>,
  initialMessages?: Message[],
  listener?: StreamListenerType
) => {
  const [data, setData] = useState<string | undefined>(undefined)
  const [controller, setController] = useState<AbortController | null>(null)

  const newMessageRef = useRef<string>('')

  const [messages, setMessages] = useState<Message[]>(initialMessages || [])

  const appendMessages = (messageList: Message[]) => {
    setMessages((prevMessages) => [...prevMessages, ...messageList])
  }

  const addUserMessage = useCallback(
    (message: string) => {
      listener?.onStartStream()

      appendMessages([
        {
          content: message,
          role: 'user',
          id: nanoid(5),
          created: new Date().toISOString(),
          sources: [],
        },
        {
          content: '',
          role: 'computer',
          id: nanoid(5),
          created: new Date().toISOString(),
          sources: [],
        },
      ])
      newMessageRef.current = ''

      const newController = new AbortController()
      setController(newController)
      const signal = newController.signal

      const fetchData = async () => {
        try {
          await fetchEventSource(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'text/event-stream',
              ...headers,
            },
            body: JSON.stringify({ message: message, history: messages }),
            signal,
            onmessage(ev) {
              try {
                const value = ev.data
                const control = value.charAt(0)
                const msg = JSON.parse(value.substring(2))

                // 0 is the message
                if (control === '0') {
                  listener?.onMessage(msg)

                  newMessageRef.current += msg

                  setMessages((prevMessages) => {
                    const lastMessage = prevMessages.slice(-1)[0]
                    lastMessage.content = newMessageRef.current
                    return [...prevMessages.slice(0, -1), lastMessage]
                  })
                }
                // 2 is the data
                else if (control === '2') {
                  setData(msg)
                  setMessages((prevMessages) => {
                    const lastMessage = prevMessages.slice(-1)[0]
                    lastMessage.sources = msg

                    return [...prevMessages.slice(0, -1), lastMessage]
                  })
                }
              } catch (error) {
                console.error('Error parsing message:', error)
              }
            },
            onclose() {
              listener?.onStopStream()
            },
          })
        } catch (error: any) {
          if (error.name === 'AbortError') {
            // Fetch was aborted
            console.log('Fetch aborted')
          } else {
            listener?.onError(error)
          }
          listener?.onStopStream()
        }
      }

      fetchData()
    },
    [messages, url, headers, listener]
  )

  const stopFetching = useCallback(() => {
    if (controller) {
      controller.abort()
      setController(null)
    }
  }, [controller])

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (controller) {
        controller.abort()
      }
    }
  }, [controller])

  return { messages, data, addUserMessage, stopFetching, listener }
}
