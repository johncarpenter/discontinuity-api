'use client'
import { SparklesIcon } from '@heroicons/react/24/outline'

//import Badge from '../Badge'
import { useEffect, useRef, useState } from 'react'
import FileCard from './filecard'

export type SourcesPanelProps = {
  workspaceId: string
  query: string
}

export default function SourcesPanel({ workspaceId, query }: SourcesPanelProps) {
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
  const [isBusy, setIsBusy] = useState(false)

  useEffect(() => {
    setIsBusy(true)
    searchDocs(query)

    async function searchDocs(query: string) {
      const response = await fetch(`/api/workspace/${workspaceId}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ q: query }),
        cache: 'force-cache',
      })
      setIsBusy(false)

      if (response.status === 200) {
        const { documents } = await response.json()
        console.log(documents)
        setMessageList(documents)
      }
      //setMessageList([{ pageContent: 'No results found', metadata: '' }])
    }
  }, [query, workspaceId])

  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  return (
    <>
      <div className="flex flex-col  dark:bg-gray-800 dark:text-white ">
        <div className="px-4 overflow-auto mt-6 m-16 flex-1 ">
          <div className="flex flex-col justify-end">
            {isBusy && (
              <div className="flex p-6 items-start">
                <SparklesIcon className="h-6 w-6 text-gray-400 animate-spin" />
              </div>
            )}
            {!isBusy && messageList && messageList.length === 0 && (
              <div className="flex p-6 items-start">
                <div className="flex items-center p-4">
                  <p>No results found</p>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 p-4">
              {!isBusy &&
                messageList?.map((message, index) => {
                  return (
                    <div key={index} className="flex p-4 items-start">
                      <FileCard
                        snippet={message.pageContent}
                        filename={message.metadata.file}
                        href={encodeURI(
                          `/api/workspace/${workspaceId}/files/${message.metadata.file}`
                        )}
                        type={message.metadata.type}
                      />
                    </div>
                  )
                })}
            </div>
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </>
  )
}
