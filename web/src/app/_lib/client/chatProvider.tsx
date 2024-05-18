'use client'
import { useContext, useState } from 'react'

import { createContext } from 'react'

type ChatContextType = {
  thread: ChatThread
  setThread: React.Dispatch<React.SetStateAction<ChatThread>>
}

const ChatContext = createContext<ChatContextType | null>(null)

type ChatContextProps = {
  children: React.ReactNode
  link: string
  modelId: string
  promptId: string
  threadId?: string
}

export type ChatThread = {
  link: string
  modelId: string
  promptId: string
  threadId?: string
}

export const ChatProvider = ({ children, link, modelId, promptId, threadId }: ChatContextProps) => {
  const [thread, setThread] = useState<ChatThread>({
    link,
    modelId,
    promptId,
    threadId,
  } as ChatThread)

  return <ChatContext.Provider value={{ thread, setThread }}>{children}</ChatContext.Provider>
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (context === undefined || context === null) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return [context.thread, context.setThread] as const
}
