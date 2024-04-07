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
import toast from 'react-hot-toast'

export function UploadDialog({ workspaceId }: { workspaceId: string }) {
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

  // Add workspace via API
  async function uploadFile(uploadFiles: File[]) {
    uploadFiles.forEach((file) => {
      uploadSingleFile(file)
    })

    setIsOpen(false)
    router.refresh()
  }

  async function uploadSingleFile(file: File) {
    const body = JSON.stringify({ filename: file.name, contentType: file.type })

    const response = await fetch(`/api/workspace/${workspaceId}/files`, { method: 'POST', body })

    if (response.ok) {
      const { url, fields } = await response.json()

      console.log('Uploading to:', url, fields)
      const formData = new FormData()
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string)
      })
      formData.append('file', file)

      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      if (uploadResponse.ok) {
        toast.error('There was an error uploading the file. Please try again')
      }
    } else {
      toast.error('There was an error uploading the file. Please try again')
    }
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
