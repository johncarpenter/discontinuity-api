// hook/useStreaming.ts
'use client'
import { nanoid } from 'nanoid'
import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import getAccessToken from './getAccessToken'

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
      date: string
    }
  }>
}

export type StreamListenerType = {
  onMessage?: (message: string) => void
  onError?: (error: Error) => void
  onStartStream?: () => void
  onStopStream?: () => void
  isBusy?: boolean
}

export const useStreaming = (
  url: string,
  workspaceId: string,
  headers?: Record<string, string>,
  listener?: StreamListenerType,
  threadId?: string
) => {
  const [data, setData] = useState<string | undefined>(undefined)
  const [controller, setController] = useState<AbortController | null>(null)

  const [thread, setThread] = useState<string | undefined>(() => {
    if (typeof window !== 'undefined') {
      const cachedId = localStorage.getItem(`${workspaceId}-threadId`)
      return cachedId || undefined
    }
  })

  const newMessageRef = useRef<string>('')

  const [messages, setMessages] = useState<Message[]>([])

  const resetChat = useCallback(() => {
    setMessages([])
    setThread(undefined)
    localStorage.removeItem(`${workspaceId}-threadId`)
  }, [workspaceId])

  useEffect(() => {
    if (messages.length > 0 && thread) {
      localStorage.setItem(`${thread}-messages`, JSON.stringify(messages))
    }
  }, [messages, thread])

  const loadInitialMessages = useCallback(() => {
    async function retrieveHistory(thread: string) {
      const token = await getAccessToken(workspaceId)

      const history = await fetch(
        `${process.env.NEXT_PUBLIC_DSC_API_URL}/workspace/history/${thread}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            ...headers,
          },
        }
      )
      setMessages(await history.json())
    }

    function retrieveThreadId() {
      const saved = localStorage.getItem(`${workspaceId}-threadId`)

      if (saved && saved !== 'undefined') {
        return JSON.parse(saved)
      }
      return undefined
    }

    const localThreadId = threadId || retrieveThreadId()

    if (localThreadId) {
      setThread(localThreadId)
      const cached = localStorage.getItem(`${localThreadId}-messages`)

      // This will only pull from localstorage, but we may want to sync it with the server?
      if (cached) {
        setMessages(JSON.parse(cached))
      } else {
        retrieveHistory(localThreadId)
      }
    }
  }, [headers, threadId, workspaceId])

  const appendMessages = (messageList: Message[]) => {
    setMessages((prevMessages) => [...prevMessages, ...messageList])
  }

  const addUserMessage = useCallback(
    (message: string, filter?: { [key: string]: any }) => {
      listener?.onStartStream?.()

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
          const token = await getAccessToken(workspaceId)

          await fetchEventSource(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
              Accept: 'text/event-stream',
              ...headers,
            },
            body: JSON.stringify({
              message: message,
              filter: filter || {},
              thread: thread,
            }),
            signal,
            onmessage(ev) {
              try {
                const value = ev.data
                const control = value.charAt(0)
                const msg = JSON.parse(value.substring(2))

                // 0 is the message
                if (control === '0') {
                  listener?.onMessage?.(msg)

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
                // 4 is the thread id
                else if (control === '4') {
                  localStorage.setItem(`${workspaceId}-threadId`, msg['thread'])
                  setThread(msg['thread'])
                }
              } catch (error) {
                console.error('Error parsing message:', error)
              }
            },
            onclose() {
              listener?.onStopStream?.()
            },
          })
        } catch (error: any) {
          if (error.name === 'AbortError') {
            // Fetch was aborted
            console.log('Fetch aborted')
          } else {
            listener?.onError?.(error)
          }
          listener?.onStopStream?.()
        }
      }

      fetchData()
    },
    [listener, url, headers, thread, workspaceId]
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

  return { messages, data, addUserMessage, stopFetching, resetChat, loadInitialMessages }
}
