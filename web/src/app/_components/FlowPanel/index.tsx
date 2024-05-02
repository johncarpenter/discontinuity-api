/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { ComputerDesktopIcon, SparklesIcon, UserIcon } from '@heroicons/react/24/outline'
import { Text } from '@/components/Base/text'

import { useRef, useState, useEffect } from 'react'
import SourcesPanel from '../SourcesPanel'
import { DirectListenerType, useDirect } from '@/lib/client/useDirect'
import { flows } from '@prisma/client'
import { RenderMarkdown } from '@/lib/client/renderMarkdown'
import FlowEmptyState from './emptystate'
import toast from 'react-hot-toast'
import ChatInput from '@/components/ChatInput'

type FlowPanelProps = {
  workspaceId: string
  flow: flows
}

export default function FlowPanel({ workspaceId, flow }: FlowPanelProps) {
  const listener: DirectListenerType = {
    onError: (error: Error) => {
      setIsBusy(false)
      if (error?.message.includes('uthoriz')) {
        toast.error(
          'You are not authorized to access this flow. Check your API is correct on the flow server'
        )
      } else {
        toast.error("We're having trouble connecting to the server. Please try again later.")
      }
    },
    onBusy: (isBusy: boolean) => {
      setIsBusy(isBusy)
    },
  }

  const { messages, addUserMessage, resetChat, loadInitialMessages } = useDirect(
    `${process.env.NEXT_PUBLIC_DSC_API_URL}/workspace/flow/${flow.id}`,
    workspaceId,
    flow.id,
    {},
    listener
  )

  useEffect(() => {
    loadInitialMessages()
  }, [])

  const [isBusy, setIsBusy] = useState(false)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleNewQuery = (message: string) => {
    addUserMessage(message)
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <>
      <div className="flex flex-col  bg-gray-50 dark:bg-gray-800 dark:text-white h-full w-full lg:min-h-screen min-h-[85vh]">
        <div className="px-4 overflow-auto mb-16 flex-1 h-full overflow-y-scroll">
          <div className="flex flex-col justify-end">
            {!isBusy && messages?.length == 0 && (
              <div className="flex h-[75vh]">
                <div className="p-4 m-auto">
                  <FlowEmptyState flow={flow} />
                </div>
              </div>
            )}
            {messages?.map((message, index) => {
              return (
                <div key={index} className="flex p-4 items-start">
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
                          <SparklesIcon className="ml-2 mt-2 h-6 w-6 text-primary-400 dark:text-white animate-spin" />{' '}
                          <div className="text-sm text-gray-600 mt-2 ml-4"> Thinking... </div>
                        </div>
                      )}
                      <RenderMarkdown content={message.content} />
                      {message.sources?.length > 0 && (
                        <>
                          <h4 className="text-lg mt-4 dark:prose-dark">Sources</h4>
                          <SourcesPanel workspaceId={workspaceId} documents={message.sources} />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}

            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="w-full sm:p-6 mx-auto">
          <ChatInput onHandleMessage={(val) => handleNewQuery(val)} onReset={() => resetChat()} />
        </div>
      </div>
    </>
  )
}
