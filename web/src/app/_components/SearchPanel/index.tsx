'use client'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

//import Badge from '../Badge'
import { useRef, useState } from 'react'
import FileCard from './filecard'

export default function SearchPanel({ workspaceId }: { workspaceId: string }) {
  type Message = {
    pageContent: string
    metadata: {
      file: string
      url: string
      type: string
      source: string
    }
  }

  const [messageList, setMessageList] = useState<Message[]>([])
  const [input, setInput] = useState('')

  async function searchDocs() {
    const response = await fetch(`/api/workspace/${workspaceId}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: input }),
      cache: 'force-cache',
    })

    if (response.status === 200) {
      const { documents } = await response.json()
      console.log(documents)
      setMessageList(documents)
    }
    //setMessageList([{ pageContent: 'No results found', metadata: '' }])
  }

  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  return (
    <>
      <div className="flex flex-col  dark:bg-gray-800 dark:text-white h-full w-full min-h-screen">
        <div className="w-full  p-4 h-24  top-50 right-auto left-auto  dark:bg-gray-800 dark:text-white pt-">
          <div className="flex flex-col w-full relative border-2 border-secondary-500 dark:text-white rounded-2xl">
            <MagnifyingGlassIcon className="absolute left-3 top-4 w-5 h-5" />
            <input
              type="text"
              className="m-0 w-full resize-none border-0 bg-transparent outline-none  dark:bg-transparent py-[10px] pr-10 md:py-3.5 md:pr-12 max-h-52 placeholder-black/50 dark:placeholder-white/50 pl-10 md:pl-[55px]"
              placeholder="Search your files here"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  searchDocs()
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
        <div className="px-4 overflow-auto mt-16 mb-16 flex-1 h-full overflow-y-scroll">
          <div className="flex flex-col justify-end">
            {messageList?.map((message, index) => {
              return (
                <div key={index} className="flex p-6 items-start">
                  <FileCard
                    snippet={message.pageContent}
                    filename={message.metadata.file}
                    href={encodeURI(`/api/workspace/${workspaceId}/files/${message.metadata.file}`)}
                    type={message.metadata.type}
                  />
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </>
  )
}
