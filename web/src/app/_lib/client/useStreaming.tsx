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
  sources: Array<MessageData>
}

export type MessageData = {
  pageContent: string
  metadata: {
    file: string
    url: string
    type: string
    source: string
    date: string
  }
}

export type StreamListenerType = {
  onMessage?: (message: string) => void
  onError?: (error: Error) => void
  onStartStream?: () => void
  onStopStream?: () => void
  isBusy?: boolean
}
export type StreamConfig = {
  threadId?: string
  headers?: Record<string, string>
  threadIdKey?: string
}

export const useStreaming = (
  url: string,
  workspaceId: string,
  listener?: StreamListenerType,
  config?: StreamConfig
) => {
  const [data, setData] = useState<MessageData[]>([])
  const [controller, setController] = useState<AbortController | null>(null)

  const [thread, setThread] = useState<string | undefined>(() => {
    if (typeof window !== 'undefined') {
      const cachedId = localStorage.getItem(`${workspaceId}-${config?.threadIdKey || ''}-threadId`)
      return cachedId || undefined
    }
  })

  const newMessageRef = useRef<string>('')

  const [messages, setMessages] = useState<Message[]>([])

  const resetChat = useCallback(() => {
    setMessages([])
    setThread(undefined)
    localStorage.removeItem(`${workspaceId}-${config?.threadIdKey || ''}-threadId`)
  }, [config?.threadIdKey, workspaceId])

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
            ...(config?.headers || ''),
          },
        }
      )
      setMessages(await history.json())
    }

    function retrieveThreadId() {
      const saved = localStorage.getItem(`${workspaceId}-${config?.threadIdKey || ''}-threadId`)

      if (saved && saved !== 'undefined') {
        return saved
      }
      return undefined
    }

    const localThreadId = config?.threadId || retrieveThreadId()

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
  }, [config, workspaceId])

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
              ...(config?.headers || ''),
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
                  // todo Append to the data stream
                  setData(msg)

                  setMessages((prevMessages) => {
                    const lastMessage = prevMessages.slice(-1)[0]
                    lastMessage.sources = msg
                    console.log('Sources:', lastMessage.sources)
                    console.log('Data:', msg)

                    return [...prevMessages.slice(0, -1), lastMessage]
                  })
                }
                // 3 is an error
                else if (control === '3') {
                  listener?.onError?.(new Error('Unknown upstream error'))
                  if (controller) {
                    controller.abort()
                  }
                  setMessages((prevMessages) => {
                    const lastMessage = prevMessages.slice(-1)[0]
                    lastMessage.content =
                      '<span class="text-sm text-secondary-600">There was an error processing your request. Please try again.</span>'
                    return [...prevMessages.slice(0, -1), lastMessage]
                  })
                }
                // 4 is the thread id
                else if (control === '4') {
                  localStorage.setItem(
                    `${workspaceId}-${config?.threadIdKey || ''}-threadId`,
                    msg['thread']
                  )
                  setThread(msg['thread'])
                }
              } catch (error) {
                console.error('Error parsing message:', error)
              }
            },
            onerror(error) {
              listener?.onError?.(error)
              if (controller) {
                controller.abort()
              }
              setMessages((prevMessages) => {
                const lastMessage = prevMessages.slice(-1)[0]
                lastMessage.content =
                  '<span class="text-sm text-secondary-600">There was an error processing your request. Please try again.</span>'
                return [...prevMessages.slice(0, -1), lastMessage]
              })
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
            setMessages((prevMessages) => {
              const lastMessage = prevMessages.slice(-1)[0]
              lastMessage.content =
                '<span class="text-sm text-secondary-600">There was an error processing your request. Please try again.</span>'
              return [...prevMessages.slice(0, -1), lastMessage]
            })
            if (controller) {
              controller.abort()
            }
          }
          listener?.onStopStream?.()
        }
      }

      fetchData()
    },
    [listener, workspaceId, url, config?.headers, config?.threadIdKey, thread, controller]
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

  return { messages, data, thread, addUserMessage, stopFetching, resetChat, loadInitialMessages }
}
