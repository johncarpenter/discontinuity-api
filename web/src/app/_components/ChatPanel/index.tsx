'use client'
import {
  ChatBubbleLeftIcon,
  ComputerDesktopIcon,
  DocumentTextIcon,
  LightBulbIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
//import Markdown from 'react-markdown'
import style from '@/css/markdown.module.css'
//import Badge from '../Badge'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
//import rehypeKatex from 'rehype-katex'
//import rehypeMathJax from 'rehype-mathjax'
import { Text } from '@/components/Base/text'

import { useChat } from 'ai/react'
import Markdown from 'react-markdown'
import { FormEvent, useEffect, useRef, useState } from 'react'
import SourcesPanel from '../SourcesPanel'
import { JSONValue } from 'ai'
import { Document } from 'langchain/document'

export default function ChatPanel({ workspaceId }: { workspaceId: string }) {
  const { messages, input, handleInputChange, handleSubmit, data } = useChat({
    api: `/api/workspace/${workspaceId}/chat`,
    onFinish: () => {
      scrollToBottom()
    },
  })

  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleNewQuery = (e: FormEvent<HTMLFormElement>) => {
    handleSubmit(e)
  }

  const [sourceDocuments, setSourceDocuments] = useState<Document[] | undefined>([])

  useEffect(() => {
    if (data) {
      const docs = convertDataToDocument(data)
      setSourceDocuments(docs)
    }
  }, [data])

  function convertDataToDocument(data: JSONValue[] | undefined) {
    if (data && data.length > 0) {
      const dataStr = JSON.parse(JSON.stringify(data))

      const docs: Document[] = []
      dataStr.forEach((doc: any) => {
        doc.sources.forEach((source: any) => {
          docs.push({
            pageContent: source.contentChunk,
            metadata: source.metadata,
          })
        })
      })
      return docs
    }
  }

  return (
    <>
      <div className="flex flex-col  bg-gray-50 dark:bg-gray-800 dark:text-white h-full w-full min-h-screen">
        <div className="w-full p-4 fixed top-10 lg:top-0 bg-gray-50 dark:bg-gray-800 dark:text-white h-16 ">
          Control bar
        </div>
        <div className="px-4 overflow-auto mt-16 mb-16 flex-1 h-full overflow-y-scroll">
          {data && (
            <>
              <div className="flex flex-row p-4">
                <DocumentTextIcon className="h-8 w-8 mr-2 text-gray-400" />
                <h3>Sources</h3>
              </div>
              <SourcesPanel workspaceId={workspaceId} documents={sourceDocuments} />
            </>
          )}
          <div className="flex flex-row p-4">
            <ChatBubbleLeftIcon className="h-8 w-8 mr-2 text-gray-400" />
            <h3>Discussion</h3>
          </div>
          <div className="flex flex-col justify-end">
            {messages?.map((message, index) => {
              return (
                <div key={index} className="flex p-6 items-start">
                  <div className="flex items-center p-4">
                    {message.role === 'user' ? (
                      <UserIcon className="h-6 w-6 text-gray-400" />
                    ) : (
                      <ComputerDesktopIcon className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex flex-col p-4">
                    <Text>{message.role === 'user' ? 'You' : 'Computer'}</Text>
                    <div className="p-4">
                      <Markdown remarkPlugins={[remarkMath, remarkGfm]} className={style.markdown}>
                        {message.content}
                      </Markdown>
                    </div>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="w-full  p-4 h-24  bottom-0 right-auto left-auto  dark:bg-gray-800 dark:text-white pt-">
          <form onSubmit={handleNewQuery}>
            <div className="flex flex-col w-full relative border-2 border-secondary-500 dark:text-white rounded-2xl">
              <LightBulbIcon className="absolute left-3 top-4 w-5 h-5" />
              <input
                type="text"
                name="chat"
                id="chat"
                className="m-0 w-full resize-none border-0 bg-transparent outline-none ring-0 dark:bg-transparent py-[10px] pr-10 md:py-3.5 md:pr-12 max-h-52 placeholder-black/50 dark:placeholder-white/50 pl-10 md:pl-[55px]"
                placeholder="Ask about Discontinuity.AI"
                onChange={handleInputChange}
                value={input}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleNewQuery
                  }
                }}
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
                  Enter
                </kbd>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
