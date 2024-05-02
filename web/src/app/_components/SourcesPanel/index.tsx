'use client'

import FileCard from './filecard'

export type SourcesPanelProps = {
  workspaceId: string
  documents?: {
    pageContent: string
    metadata: {
      file: string
      url: string
      type: string
      source: string
      date: string
    }
  }[]
}

export default function SourcesPanel({ workspaceId, documents }: SourcesPanelProps) {
  return (
    <>
      <div className="flex flex-col  ">
        <div className="px-4 overflow-auto mt-6 m-4 flex-1 ">
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
                  <div key={index} className="col-span-1 card-normal">
                    <FileCard
                      snippet={document.pageContent ?? ''}
                      filename={document.metadata?.file ?? ''}
                      href={encodeURI(
                        `/api/workspace/${workspaceId}/files/${document.metadata?.file}`
                      )}
                      type={document.metadata?.type}
                      date={document.metadata?.date ?? new Date().toISOString()}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
