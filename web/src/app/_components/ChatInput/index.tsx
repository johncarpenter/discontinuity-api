/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { PencilSquareIcon, ArrowRightCircleIcon, ShareIcon } from '@heroicons/react/24/outline'
import { Text } from '@/components/Base/text'

import { useState } from 'react'
import { Button } from '@/components/Base/button'

import { LuUpload } from 'react-icons/lu'
import { UploadFileDialog } from '@/components/Dialogs/uploadFiles'
import { useFocusFiles } from '@/lib/client/workspaceProvider'
import { StarIcon } from '@heroicons/react/20/solid'
import { FocusedFilesDialog } from '@/components/Dialogs/focusedFiles'
import { ShareDialog } from '@/components/Dialogs/sharedialog'

type ChatInputProps = {
  workspaceId: string
  shareLink: string
  onReset: () => void
  onHandleMessage: (message: string) => void
}

export default function ChatInput({
  workspaceId,
  shareLink,
  onHandleMessage,
  onReset,
}: ChatInputProps) {
  const [input, setInput] = useState<string>('')

  const [focusFiles, setFocusFiles] = useFocusFiles()

  const onHandleMessageInternal = () => {
    setInput('')
    onHandleMessage(input)
  }

  const autoScaleRows = (text: string) => {
    const rows = text.split(/\r|\r\n|\n/).length

    return rows > 10 ? 10 : rows < 3 ? 3 : rows
  }

  const fileListener = {
    onFileSuccess: (filename: string) => {
      setFocusFiles([...(focusFiles || []), filename])
    },
  }

  return (
    <>
      <div className="flex flex-row w-full dark:bg-gray-700 dark:text-white bg-slate-700 border-1 border-slate-800 rounded-md px-4 pt-4 pb-2  text-white/50 ">
        {/* <LightBulbIcon className="lg:left-3 left-2 lg:top-3 top-2 w-8 h-8 flex-0 text-black/50 justify-center my-auto" /> */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex flex-row">
            <textarea
              autoFocus={true}
              name="chat"
              id="chat"
              rows={autoScaleRows(input)}
              className="w-full resize-none flex-1 dark:placeholder-gray-500 placeholder-grey-600/80 border-none bg-transparent  text-white border-0 focus:outline-none focus:ring-0 focus:border-0 dark:focus:border-0 font-semibold"
              placeholder="Ask anything...."
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyUp={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && input.length > 0) {
                  onHandleMessageInternal()
                }
              }}
            />
            <Button onClick={onReset} plain={true} className="ml-auto mb-auto flex-0">
              <PencilSquareIcon className="h-6 w-6 ml-auto text-white/50" />
            </Button>
          </div>
          <div className="grid grid-cols-2 items-center w-full outline-none focus:outline-none">
            <div className="flex flex-row w-fullrounded-md  text-white/50 ">
              <UploadFileDialog workspaceId={workspaceId} listener={fileListener}>
                <div className="flex-1 flex flex-row">
                  <LuUpload className="w-4 h-4 text-white/50 my-auto mr-2" />
                  <Text className="text-white/50">Add Files</Text>
                </div>
              </UploadFileDialog>
              {focusFiles && focusFiles.length > 0 && (
                <FocusedFilesDialog>
                  <div className="flex-1 flex flex-row">
                    <StarIcon className="w-4 h-4 text-white/50 my-auto mr-2" />
                    <Text className="text-white/50">Focused Files</Text>
                  </div>
                </FocusedFilesDialog>
              )}
            </div>
            <div className="flex flex-row ml-auto">
              <ShareDialog shareLink={shareLink}>
                <div className="flex-1 flex flex-row">
                  <ShareIcon className="w-4 h-4 text-white/50 my-auto mr-2" />
                  <Text className="text-white/50">Share</Text>
                </div>
              </ShareDialog>
              <Button
                onClick={() => onHandleMessageInternal()}
                plain={true}
                className=" text-white/50"
              >
                <ArrowRightCircleIcon className="lg:right-3 right-2 lg:top-3 top-2 w-6 h-6 flex-0  justify-center my-auto text-white/50" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
