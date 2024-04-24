// hook/useStreaming.ts
'use client'
import { nanoid } from 'nanoid'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocalStorage } from '@/lib/client/useLocalStorage'
import { Message } from './useStreaming'

export type DirectListenerType = {
  onMessage?: (message: string) => void
  onError?: (error: Error) => void
  onBusy?: (isBusy: boolean) => void
}

export const useDirect = (
  url: string,
  workspaceId: string,
  headers?: Record<string, string>,
  listener?: DirectListenerType,
  threadId?: string,
  flowId?: string
) => {
  const [data, setData] = useState<string | undefined>(undefined)

  const [thread, setThread] = useLocalStorage(`${flowId}-threadId`, threadId)

  const newMessageRef = useRef<string>('')

  const [messages, setMessages] = useState<Message[]>([])

  const resetChat = useCallback(() => {
    setMessages([])
    setThread(null)
  }, [setThread])

  useEffect(() => {
    if (messages.length > 0 && thread) {
      localStorage.setItem(`${thread}-messages`, JSON.stringify(messages))
    }
  }, [messages, thread])

  // useEffect(() => {
  //   // Retrieve initial messages
  //   async function retrieveHistory(thread: string) {
  //     const history = await fetch(
  //       `${process.env.NEXT_PUBLIC_DSC_API_URL}/workspace/history/${thread}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           ...headers,
  //         },
  //       }
  //     )
  //     setMessages(await history.json())
  //   }
  //   if (thread) {
  //     console.log('Retrieving history for thread:', thread)
  //     const cached = localStorage.getItem(`${thread}-messages`)

  //     if (cached) {
  //       setMessages(JSON.parse(cached))
  //     } else {
  //       retrieveHistory(thread)
  //     }
  //   }
  // }, [thread, headers])

  const appendMessages = (messageList: Message[]) => {
    setMessages((prevMessages) => [...prevMessages, ...messageList])
  }

  const addUserMessage = useCallback(
    (message: string) => {
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

      const fetchData = async () => {
        try {
          listener?.onBusy?.(true)
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...headers,
            },
            body: JSON.stringify({
              message: message,
            }),
          })

          const data = await response.json()

          setData(undefined)
          setThread(data.chatId)
          setMessages((prevMessages) => {
            const lastMessage = prevMessages.slice(-1)[0]
            lastMessage.content = JSON.stringify(data.json)

            return [...prevMessages.slice(0, -1), lastMessage]
          })
          listener?.onBusy?.(false)

          listener?.onMessage?.(data)
        } catch (error: any) {
          listener?.onBusy?.(false)
          if (error.name === 'AbortError') {
            // Fetch was aborted
            console.log('Fetch aborted')
          } else {
            listener?.onError?.(error)
          }
        }
      }

      fetchData()
    },
    [listener, url, headers, setThread, appendMessages, setMessages]
  )

  return { messages, data, addUserMessage, resetChat }
}
