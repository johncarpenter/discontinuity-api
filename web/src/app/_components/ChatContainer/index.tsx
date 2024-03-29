'use client'

import React, { useEffect } from 'react'
import { useState } from 'react'
import Markdown from 'react-markdown'
import style from './markdown.module.css'
import useMessagePolling from '@/lib/client/useMessagePolling'
import sendChatMessage, { ChatMessageResponse } from '@/lib/client/sendChatMessage'
import { ComputerDesktopIcon, SparklesIcon, UserIcon } from '@heroicons/react/24/outline'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'

interface ChatMessageProps {
  prompt_text?: string
  assistant_id: string
}

interface ChatMessage {
  question: string
  response: string
}

const ChatMessageDisplay = ({ question, response }: ChatMessage) => {
  return (
    <div className="relative mt-6 p-6 flex-1 px-4 sm:px-6 ">
      <div className="flex p-6 items-center bg-slate-500 rounded-md" aria-hidden="true">
        <UserIcon className="h-6 w-6 text-gray-50" aria-hidden="true" />
        <span className="ml-8 text-md text-gray-50"> {question}</span>
      </div>

      <div className="flex p-6 items-center" aria-hidden="true">
        <ComputerDesktopIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
        <div className="ml-8 text-md text-gray-800">
          <Markdown remarkPlugins={[remarkMath, remarkGfm]} className={style.markdown}>
            {response}
          </Markdown>
        </div>
      </div>
    </div>
  )
}

export default function ChatContainer({ assistant_id }: ChatMessageProps) {
  const [input, setInput] = useState('')

  const [question, setQuestion] = useState('')
  const [processing, setProcessing] = useState(false)
  const [summary, setSummary] = useState<ChatMessage[]>([])
  const [message, setMessage] = useState<ChatMessageResponse>()

  const { response, isError } = useMessagePolling(message?.run, message?.thread)

  useEffect(() => {
    if (response) {
      setSummary([...summary, { question: question, response: response }])
      setProcessing(false)
      setMessage({ run: '', thread: message?.thread ?? '' })
    }
  }, [message?.thread, question, response, summary])

  const handleClick = async (text: string) => {
    const resp = await sendChatMessage({
      text: text,
      assistant_id: assistant_id,
      thread_id: message?.thread ?? '',
    })
    setMessage({ run: resp.run, thread: resp.thread })
    setQuestion(text)
    setInput('')
    setProcessing(true)
  }

  return (
    <div className="flex flex-col justify-between w-full bg-slate-200 item-stretch overflow-y-auto  h-[90vh] rounded-md ">
      <div className="w-full flex-grow">
        <div className="relative mt-6 flex-1 px-4 sm:px-6 mx-auto">
          <h4 className="text-lg font-semibold text-gray-800">Welcome to the Chatbot</h4>
          <div className="mt-2">
            <div className="text-sm text-gray-600">
              <p>
                The chatbot is a tool to help you find information on the site. It is powered by an
                AI that has been trained on the content of the site. You can ask it questions about
                the site and it will try to answer them. You can also ask it to show you specific
                pages on the site.
              </p>
            </div>
          </div>
        </div>

        {summary &&
          summary.map((item, index) => (
            <ChatMessageDisplay key={index} question={item.question} response={item.response} />
          ))}
        {isError && (
          <div className="relative mt-6 flex-1 px-4 sm:px-6">
            <h4 className="text-lg font-semibold text-gray-200">{question}</h4>
            <div className="mt-2">
              <div className="text-sm text-gray-300">
                <p>Sorry, We are having problems with that request. Please try again later</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-full  p-6 mx-auto ">
        <label htmlFor="chat" className="block text-sm p-4 font-medium leading-6 text-gray-800">
          Type your question. Using LLMs may occassionally retrun unexpected or incorrect results.
          {processing && (
            <>
              <SparklesIcon className="ml-2 mt-2 h-6 w-6 text-primary-400 animate-spin" />
            </>
          )}
        </label>
        <div className="relative mt-2flex items-center">
          <textarea
            rows={3}
            name="chat"
            id="chat"
            className="block text-md w-full rounded-md border-0 bg-gray-200 m-2 py-2 pl-2 pr-14 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleClick(input)
              }
            }}
          />
          <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
            <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-500">
              Enter
            </kbd>
          </div>
        </div>
      </div>
    </div>
  )
}
