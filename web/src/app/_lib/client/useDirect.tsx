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

export type DirectConfig = {
  threadId?: string
  headers?: Record<string, string>
  threadIdKey?: string
}

export const useDirect = (
  url: string,
  workspaceId: string,
  listener?: DirectListenerType,
  config?: DirectConfig
) => {
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
    (message: string, overrideConfig?: { [key: string]: any }) => {
      listener?.onBusy?.(true)

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
              ...(config?.headers || ''),
            },
            body: JSON.stringify({
              message: message,
              overrideConfig,
            }),
          })

          if (!response.ok) {
            // Server down errors
            throw new Error('Failed to fetch')
          }

          const data = await response.json()

          console.log(data)
          if (data?.success === false) {
            throw new Error(data.message)
          }

          const resultText = data.json
            ? '``` ' + JSON.stringify(data.json) + '```'
            : data.text.replace(/\\/g, '')

          setThread(data.chatId)
          localStorage.setItem(`${workspaceId}-${config?.threadIdKey || ''}-threadId`, data.chatId)
          setMessages((prevMessages) => {
            const lastMessage = prevMessages.slice(-1)[0]
            lastMessage.content = resultText

            return [...prevMessages.slice(0, -1), lastMessage]
          })
          listener?.onBusy?.(false)

          listener?.onMessage?.(data)
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
            listener?.onBusy?.(false)
          }
          listener?.onBusy?.(false)
        }
      }

      fetchData()
    },
    [listener, workspaceId, url, config?.headers, config?.threadIdKey]
  )

  return { messages, thread, addUserMessage, resetChat, loadInitialMessages }
}
