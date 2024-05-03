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
import { useFocusFiles } from '@/lib/client/workspaceProvider'
import { DocumentIcon } from '@heroicons/react/24/outline'
import { Text } from '@/components/Base/text'

export function FocusedFilesDialog({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const [focusFiles, setFocusFiles] = useFocusFiles()

  function clearAll() {
    setFocusFiles([])
    setIsOpen(false)
  }

  return (
    <>
      <Button plain onClick={() => setIsOpen(true)}>
        {children}
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen} darkMode={true}>
        <DialogTitle>Focused Files</DialogTitle>
        <DialogDescription>Narrow your search to these files</DialogDescription>
        <DialogBody>
          {focusFiles?.map((file) => (
            <div key={file} className="flex flex-col  justify-between m-4">
              <Button
                onClick={() => {
                  setFocusFiles(focusFiles.filter((f) => f !== file))
                }}
                plain
              >
                <div className="flex flex-1 items-center">
                  <DocumentIcon className="h-6 w-6 mr-2" />
                  <Text>{file}</Text>
                </div>

                <StarIcon
                  className={clsx(
                    'h-5 w-5',
                    focusFiles.filter((f) => f !== file) ? 'text-secondary-500' : 'text-lighter'
                  )}
                />
              </Button>
            </div>
          ))}
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button color="secondary" onClick={() => clearAll()}>
            Clear All
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
