// hook/useStreaming.ts
'use client'
import { nanoid } from 'nanoid'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Message } from './useStreaming'
import getAccessToken from './getAccessToken'

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
  flowId?: string
) => {
  const [data, setData] = useState<string | undefined>(undefined)

  const [thread, setThread] = useState<string | undefined>(() => {
    if (typeof window !== 'undefined') {
      const cachedId = localStorage.getItem(`${flowId}-threadId`)
      return cachedId || undefined
    }
    return undefined
  })

  const newMessageRef = useRef<string>('')

  const [messages, setMessages] = useState<Message[]>([])

  const resetChat = useCallback(() => {
    setMessages([])
    setThread(undefined)
  }, [setThread])

  useEffect(() => {
    if (messages.length > 0 && thread) {
      localStorage.setItem(`${thread}-messages`, JSON.stringify(messages))
    }
  }, [messages, thread])

  const loadInitialMessages = useCallback(() => {
    // Retrieve initial messages
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
    if (thread) {
      const cached = localStorage.getItem(`${thread}-messages`)

      if (cached) {
        setMessages(JSON.parse(cached))
      } else {
        retrieveHistory(thread)
      }
    }
  }, [thread, workspaceId, headers])

  const addUserMessage = useCallback(
    (message: string) => {
      const appendMessages = (messageList: Message[]) => {
        setMessages((prevMessages) => [...prevMessages, ...messageList])
      }

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

          const token = await getAccessToken(workspaceId)

          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
              ...headers,
            },
            body: JSON.stringify({
              message: message,
            }),
          })

          const data = await response.json()

          const resultText = data.json ? data.json : data.text.replace(/\\/g, '')

          setData(undefined)
          setThread(data.chatId)
          localStorage.setItem(`${flowId}-threadId`, data.chatId)
          setMessages((prevMessages) => {
            const lastMessage = prevMessages.slice(-1)[0]
            lastMessage.content = resultText

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
    [listener, workspaceId, url, headers, flowId]
  )

  return { messages, data, addUserMessage, resetChat, loadInitialMessages }
}
