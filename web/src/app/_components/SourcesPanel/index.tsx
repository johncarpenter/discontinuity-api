'use client'

//import Badge from '../Badge'
import { useRef } from 'react'
import FileCard from './filecard'
import { Document } from 'langchain/document'

export type SourcesPanelProps = {
  workspaceId: string
  documents?: Document[]
}

export default function SourcesPanel({ workspaceId, documents }: SourcesPanelProps) {
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  console.log(documents)
  return (
    <>
      <div className="flex flex-col  dark:bg-gray-800 dark:text-white ">
        <div className="px-4 overflow-auto mt-6 m-16 flex-1 ">
          <div className="flex flex-col justify-end">
            {documents && documents.length === 0 && (
              <div className="flex p-6 items-start">
                <div className="flex items-center p-4">
                  <p>No results found</p>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
              {documents?.map((document, index) => {
                return (
                  <div
                    key={index}
                    className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
                  >
                    <FileCard
                      snippet={document.pageContent ?? ''}
                      filename={document.metadata.file}
                      href={encodeURI(
                        `/api/workspace/${workspaceId}/files/${document.metadata.file}`
                      )}
                      type={document.metadata.type}
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
