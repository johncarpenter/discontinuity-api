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

import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import { DocumentIcon, SparklesIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

export function UploadDialog({ workspaceId }: { workspaceId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [drag, setDrag] = useState(false)

  const router = useRouter()

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 50,
    maxSize: 5 * 1024 * 1024, // 5MB
    onDrop: (acceptedFiles) => {
      uploadFile(acceptedFiles)
    },
    onDragEnter: () => {
      setDrag(true)
    },
    onDragLeave: () => {
      setDrag(false)
    },
    onError: () => {
      toast.error('There was a problem uploading the file. Please try again.')
    },
    onDropRejected: () => {
      toast.error(
        'Contact support for help in processing files larger than 5mb, or more than 50 at a time'
      )
    },
  })

  // Add workspace via API
  function uploadFile(uploadFiles: File[]) {
    setIsUploading(true)
    Promise.all(uploadFiles.map(uploadSingleFile)).then(() => {
      setIsUploading(false)
      router.refresh()
      setIsOpen(false)
    })
  }

  async function uploadSingleFile(file: File) {
    const body = JSON.stringify({ filename: file.name, contentType: file.type })

    const response = await fetch(`/api/workspace/${workspaceId}/files`, { method: 'POST', body })

    console.log(response)

    if (response.ok) {
      const { url, fields } = await response.json()

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
        toast.success(
          'File uploaded successfully. Loading the file into the workspace will take betwen 1-5 minutes'
        )
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
      <Dialog open={isOpen} onClose={setIsOpen} darkMode={true}>
        <DialogTitle>File Upload</DialogTitle>
        <DialogDescription>Add Files to Context Database</DialogDescription>
        <DialogBody>
          {isUploading ? (
            <>
              <div className="flex p-4 items-start">
                <SparklesIcon className="ml-2 mt-2 h-6 w-6 text-primary-400 animate-spin" />{' '}
                <div className="text-sm text-gray-600 mt-2 ml-4"> Uploading... </div>
              </div>
            </>
          ) : (
            <div
              className={clsx(drag && 'border-red-400', [
                'relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
              ])}
            >
              <div {...getRootProps({ className: 'dropzone' })} className="w-full h-full">
                <input {...getInputProps()} />
                <div className="absolute inset-0 bg-gray-100 bg-opacity-50 rounded-lg flex flex-col items-center">
                  <input {...getInputProps()} />
                  <DocumentIcon className="h-12 w-12 p-2" />
                  <p className="text-md text-gray-600">Drag and drop your files here</p>
                </div>
              </div>
            </div>
          )}
          <p className="text-sm text-gray-400 p-2">
            Larger files could take between 1-5 min to process. Contact support for help pipelining
            larger files or data sets.
          </p>
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
