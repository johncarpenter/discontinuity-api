'use client'

import { Button } from '@/components/Base/button'
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '@/components/Base/dialog'
import { useState } from 'react'

import { StarIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { ArrowLeftIcon, ArrowRightIcon, DocumentIcon } from '@heroicons/react/24/outline'
import { Text } from '@/components/Base/text'
import useFiles from '@/app/_lib/client/useFiles'
import { files } from '@prisma/client'
import { useFocusFiles } from '@/app/_lib/client/workspaceProvider'
import { Pagination } from '@/components/Base/pagination'
import { LuUpload } from 'react-icons/lu'

export type SelectFilesDialogProps = {
  children: React.ReactNode
  workspaceId: string
  fileTypeFilter?: string[]
  onAddFileRequested?: () => void
}

export function SelectFilesDialog({
  children,
  workspaceId,
  fileTypeFilter,
  onAddFileRequested,
}: SelectFilesDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { files, isLoading, isError } = useFiles({ workspaceId, fileTypeFilter })
  const [focusFiles, setFocusFiles] = useFocusFiles()

  const [page, setPage] = useState(0)

  function getPagedFiles() {
    return files?.slice(page * 10, page * 10 + 10)
  }

  const maxPage = Math.floor((files?.length || 0) / 10)

  function clearAll() {
    setFocusFiles([])
    setIsOpen(false)
  }

  function toggleFile(file: string) {
    setFocusFiles((prev) => {
      if (prev?.includes(file)) {
        return prev?.filter((f) => f !== file)
      }
      return [...(prev || []), file]
    })
  }

  return (
    <>
      <Button plain onClick={() => setIsOpen(true)}>
        {children}
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen} darkMode={true}>
        <DialogTitle>Select Files for Focus</DialogTitle>
        <DialogDescription>Narrow your search to these files</DialogDescription>
        <DialogBody>
          {focusFiles && focusFiles?.length > 10 && (
            <Button
              disabled={!focusFiles || focusFiles.length == 0}
              color="secondary"
              onClick={() => clearAll()}
            >
              Clear All
            </Button>
          )}
          {isLoading && <Text>Loading...</Text>}
          {isError && <Text>Error loading files</Text>}
          {files?.length == 0 && <Text className="m-6">No files found</Text>}
          {getPagedFiles()?.map((file: files) => (
            <div key={file.filename} className="flex flex-col  justify-between m-4">
              <Button
                onClick={() => {
                  toggleFile(file.filename)
                }}
                plain
              >
                <div className="flex flex-1 items-center">
                  <DocumentIcon className="h-6 w-6 mr-2" />
                  <Text>{file.filename}</Text>
                </div>

                <StarIcon
                  className={clsx(
                    'h-5 w-5',
                    focusFiles?.includes(file.filename) ? 'text-secondary-500' : 'text-lighter'
                  )}
                />
              </Button>
            </div>
          ))}

          {files && files?.length > 10 && (
            <>
              <div className="flex-grow border-t dark:border-gray-700 border-gray-400"></div>
              <Pagination className="grow dark:text-gray-400 text-gray-700 pt-6">
                <Button
                  plain
                  disabled={page == 0}
                  onClick={() => setPage(page == 0 ? 0 : page - 1)}
                >
                  <ArrowLeftIcon className="w-6 h-6" /> Prev
                </Button>
                <Button
                  plain
                  className="ml-auto"
                  disabled={page == maxPage}
                  onClick={() => setPage(page == maxPage ? maxPage : page + 1)}
                >
                  Next
                  <ArrowRightIcon className="w-6 h-6" />
                </Button>
              </Pagination>
            </>
          )}
        </DialogBody>
        <DialogActions>
          {onAddFileRequested && (
            <Button plain onClick={() => onAddFileRequested()} className="mr-auto">
              <LuUpload className="w-4 h-4 text-white/50 my-auto mr-2" />
              <Text className="text-white/50">Add Files</Text>
            </Button>
          )}
          <Button plain onClick={() => setIsOpen(false)}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
