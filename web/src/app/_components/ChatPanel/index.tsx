/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { ComputerDesktopIcon, SparklesIcon, UserIcon } from '@heroicons/react/24/outline'
import { Text } from '@/components/Base/text'

import { useRef, useState, useEffect } from 'react'
import SourcesPanel from '../SourcesPanel'
import { StreamListenerType, useStreaming } from '@/lib/client/useStreaming'
import ChatEmptyState from './emptystate'
import { RenderMarkdown } from '@/lib/client/renderMarkdown'
import ChatInput from '@/components/ChatInput'
import { useFocusFiles } from '@/lib/client/workspaceProvider'
import { threads, workspaces } from '@prisma/client'
import { useChat } from '@/lib/client/chatProvider'

type ChatPanelProps = {
  workspace: workspaces
  chatThread?: threads
}

export default function ChatPanel({ workspace, chatThread }: ChatPanelProps) {
  const listener: StreamListenerType = {
    onError: () => {
      setIsBusy(false)
    },
    onStartStream: () => {
      setIsBusy(true)
    },
    onStopStream: () => {
      setIsBusy(false)
    },
  }

  const { messages, addUserMessage, resetChat, loadInitialMessages } = useStreaming(
    `${process.env.NEXT_PUBLIC_DSC_API_URL}/workspace/chat`,
    workspace.id,
    listener,
    {
      threadId: chatThread?.threadId ?? undefined,
    }
  )

  const [thread, setThread] = useChat()

  useEffect(() => {
    loadInitialMessages()
    if (chatThread) {
      setThread({
        threadId: chatThread.threadId ?? undefined,
        modelId: chatThread.llmmodelId ?? thread.modelId,
        promptId: chatThread.promptId ?? thread.promptId,
        link: chatThread.link,
      })
    } else {
      setThread({
        ...thread,
        link: `https://discontinuity.ai/app/workspace/${workspace.slug}/chat/`,
      })
    }
  }, [])

  const [isBusy, setIsBusy] = useState(false)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const [focusFiles] = useFocusFiles()

  const handleNewQuery = (message: string) => {
    addUserMessage(message, { files: focusFiles })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <>
      <div className="flex flex-col  h-full w-full lg:min-h-screen min-h-[85vh]">
        <div className="px-4 overflow-auto mb-16 flex-1 h-full">
          <div className="flex flex-col justify-end">
            {!isBusy && messages?.length == 0 && (
              <div className="flex h-[75vh]">
                <div className="p-4 m-auto">
                  <ChatEmptyState />
                </div>
              </div>
            )}

            {messages?.map((message, index) => {
              return (
                <div key={index} className="flex p-4 items-start">
                  {index === messages.length - 1 && <div ref={messagesEndRef} />}
                  <div className="flex items-center p-2">
                    {message.role === 'user' ? (
                      <UserIcon className="h-6 w-6 text-slate-400" />
                    ) : (
                      <ComputerDesktopIcon className="h-6 w-6 text-slate-400" />
                    )}
                  </div>
                  <div className="flex flex-col p-2">
                    <Text>{message.role === 'user' ? 'You' : 'AI'}</Text>
                    <div className="p-2">
                      {isBusy && index == messages?.length - 1 && (
                        <div className="flex p-4 items-start">
                          <SparklesIcon className="ml-2 mt-2 h-6 w-6 text-primary-400 dark:text-gray-600 animate-spin" />{' '}
                          <div className="text-sm text-gray-600 mt-2 ml-4"> Thinking... </div>
                        </div>
                      )}
                      <RenderMarkdown content={message.content} />
                      {message.sources?.length > 0 && (
                        <>
                          <h4 className="text-lg mt-4 dark:prose-dark">Sources</h4>
                          <SourcesPanel workspaceId={workspace.id} documents={message.sources} />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="w-full sm:p-4 sticky bottom-0 bg-gray-800">
          <ChatInput
            workspaceId={workspace.id}
            onHandleMessage={(val) => handleNewQuery(val)}
            onReset={() => resetChat()}
            showFiles={true}
            threadView={thread === undefined}
          />
        </div>
      </div>
    </>
  )
}
