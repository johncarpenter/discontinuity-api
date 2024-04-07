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
import { useRouter } from 'next/navigation'

import Dropzone from 'react-dropzone'

export function UploadDialog({ workspaceId }: { workspaceId: string }) {
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

  // Add workspace via API
  async function uploadFile(uploadFiles: File[]) {
    console.log(uploadFiles)
    const body = new FormData()
    uploadFiles.forEach((file) => {
      body.append('file', file, file.name)
    })

    const response = await fetch(`/api/workspace/${workspaceId}/files`, { method: 'POST', body })
    setIsOpen(false)
    router.refresh()
  }

  return (
    <>
      <Button color="secondary" type="button" onClick={() => setIsOpen(true)}>
        Upload Files
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>File Upload</DialogTitle>
        <DialogDescription>Add Files to Vector</DialogDescription>
        <DialogBody>
          <Dropzone onDrop={uploadFile} minSize={0} maxSize={5242880}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                Click me to upload a file!
              </div>
            )}
          </Dropzone>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
