'use client'
import { Fragment, useState } from 'react'
import {
  ComputerDesktopIcon,
  LightBulbIcon,
  SparklesIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import Markdown from 'react-markdown'
import style from '@/css/markdown.module.css'
import Badge from '../Badge'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
//import rehypeKatex from 'rehype-katex'
//import rehypeMathJax from 'rehype-mathjax'

interface MessageType {
  message: string
  type: 'user' | 'assistant' | 'system'
}

export default function ChatPanel() {
  const [input, setInput] = useState('')
  const [summary, setSummary] = useState('')

  const [question, setQuestion] = useState('')
  const [processing, setProcessing] = useState(false)

  const [isError, setIsError] = useState(false)

  const [messageList, setMessageList] = useState<MessageType[]>()

  const handleClick = async (text: string) => {
    appendMessage({ message: text, type: 'user' } as MessageType)
    setProcessing(true)

    const response = await fetch('/api/ai/flow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: text, id: '8c416847-3999-4248-8167-1220917c9e2d' }),
    })
    if (!response.ok) {
      setIsError(true)
      return
    }

    const ans = await response.json()

    setQuestion(text)
    appendMessage({ message: ans.text, type: 'assistant' } as MessageType)

    setSummary(ans.text)
  }

  async function appendMessage(data: MessageType) {
    setMessageList((prev) => [...(prev ?? []), data])
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 dark:text-white h-full">
        <div className="w-full p-4 bg-blue-500 text-white h-16">Fixed chat header</div>

        <div className="px-4 overflow-auto mt-16 mb-16 flex-1 h-full">
          <div className="flex h-full items-center justify-center rounded-full bg-white text-gray-950">
            {messageList?.map((message, index) => {
              return (
                <div
                  key={index}
                  className={`flex p-6 items-center ${
                    message.type === 'user' ? 'bg-slate-500' : 'bg-slate-400'
                  } rounded-md`}
                >
                  <div className="flex items-center">
                    {message.type === 'user' ? (
                      <UserIcon className="h-6 w-6 text-gray-50" />
                    ) : (
                      <ComputerDesktopIcon className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                  <span className="ml-8 text-md text-gray-50"> {message.message}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="w-full p-4 bg-blue-500 text-white relative bottom-0  pt-2 md:pt-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:w-[calc(100%-.5rem)]">
          <div className="overflow-hidden [&:has(textarea:focus)]:border-token-border-xheavy [&:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)] flex flex-col w-full flex-grow relative border dark:text-white rounded-2xl bg-token-main-surface-primary border-token-border-medium">
            <LightBulbIcon className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="chat"
              id="chat"
              className="m-0 w-full resize-none border-0 bg-transparent focus:ring-0 focus-visible:ring-0 dark:bg-transparent py-[10px] pr-10 md:py-3.5 md:pr-12 max-h-52 placeholder-black/50 dark:placeholder-white/50 pl-10 md:pl-[55px]"
              placeholder="Ask about Discontinuity.AI"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  handleClick(input)
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
