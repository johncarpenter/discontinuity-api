/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import {
  ChatBubbleLeftIcon,
  ComputerDesktopIcon,
  LightBulbIcon,
  PencilSquareIcon,
  SparklesIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import style from '@/css/markdown.module.css'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import { Text } from '@/components/Base/text'

import Markdown from 'react-markdown'
import { useRef, useState, useEffect } from 'react'
import SourcesPanel from '../SourcesPanel'
import { StreamListenerType, useStreaming } from '@/lib/client/useStreaming'
import { Button } from '@/components/Base/button'
import ChatEmptyState from './emptystate'

type ChatPanelProps = {
  workspaceId: string
}

export default function ChatPanel({ workspaceId }: ChatPanelProps) {
  const listener: StreamListenerType = {
    onError: (error: Error) => {
      console.error(error)
      setIsBusy(false)
    },
    onStartStream: () => {
      setIsBusy(true)
    },
    onStopStream: () => {
      setIsBusy(false)
    },
  }

  const [threadId] = useState<string | undefined>(() => {
    if (typeof window !== 'undefined') {
      const cachedId = localStorage.getItem(`${workspaceId}-threadId`)
      return cachedId || undefined
    }
    return undefined
  })

  const { messages, addUserMessage, resetChat, loadInitialMessages } = useStreaming(
    `${process.env.NEXT_PUBLIC_DSC_API_URL}/workspace/agent`,
    workspaceId,
    {},
    listener,
    threadId
  )

  useEffect(() => {
    loadInitialMessages()
  }, [])

  const [isBusy, setIsBusy] = useState(false)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleNewQuery = (message: string) => {
    addUserMessage(message)
    setInput('')
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <>
      <div className="flex flex-col  bg-gray-50 dark:bg-gray-800 dark:text-white h-full w-full lg:min-h-screen min-h-[85vh]">
        <div className="sticky top-10 lg:top-0  dark:bg-gray-800 dark:text-white h-16 w-full">
          <div className="flex flex-row p-4 bg-gray-200">
            <ChatBubbleLeftIcon className="h-8 w-8 mr-2 text-gray-400" />
            <h3>Search and Discovery</h3>
            <Button onClick={resetChat} plain={true} className="ml-auto">
              <PencilSquareIcon className="h-6 w-6 ml-auto text-gray-600" />
            </Button>
          </div>
        </div>

        <div className="px-4 overflow-auto mb-16 flex-1 h-full overflow-y-scroll">
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
                  <div className="flex items-center p-2">
                    {message.role === 'user' ? (
                      <UserIcon className="h-6 w-6 text-gray-400" />
                    ) : (
                      <ComputerDesktopIcon className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex flex-col p-2">
                    <Text>{message.role === 'user' ? 'You' : 'AI'}</Text>
                    <div className="p-2">
                      {isBusy && index == messages?.length - 1 && (
                        <div className="flex p-4 items-start">
                          <SparklesIcon className="ml-2 mt-2 h-6 w-6 text-primary-400 animate-spin" />{' '}
                          <div className="text-sm text-gray-600 mt-2 ml-4"> Searching... </div>
                        </div>
                      )}
                      <Markdown remarkPlugins={[remarkMath, remarkGfm]} className={style.markdown}>
                        {message.content}
                      </Markdown>
                      {message.sources?.length > 0 && (
                        <>
                          <h4 className="mt-2">Sources</h4>
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
        <div className="w-full  p-4 h-24  bottom-0 right-auto left-auto  dark:bg-gray-800 dark:text-white pt-">
          <div className="flex flex-col w-full relative border-2 border-secondary-500 dark:text-white rounded-2xl">
            <LightBulbIcon className="absolute lg:left-3 left-2 lg:top-3 top-2 w-6 h-6" />
            <input
              type="text"
              name="chat"
              id="chat"
              className="m-0 w-full resize-none border-0 bg-transparent outline-none ring-0 dark:bg-transparent py-[10px] pr-10 md:py-3.5 md:pr-12 max-h-52 placeholder-black/50 dark:placeholder-white/50 pl-10 md:pl-[55px]"
              placeholder="Ask about Discontinuity.AI"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  handleNewQuery(input)
                }
              }}
            />
            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
              <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
                Enter
              </kbd>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
