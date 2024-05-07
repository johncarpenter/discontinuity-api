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
import * as mime from 'mime-types'

const allFileTypes = [
  'pdf',
  'eml',
  'html',
  'md',
  'msg',
  'rst',
  'rtf',
  'txt',
  'doc',
  'docx',
  'epub',
  'odt',
  'pdf',
  'ppt',
  'pptx',
  'xlsx',
  'jpg',
  'jpeg',
  'png',
  'gif',
  'tiff',
  'bmp',
  'heic',
  'webp',
  'mp3',
  'wav',
  'flac',
  'ogg',
  'm4a',
  'aac',
  'csv',
  'tsv',
  'json',
  'xml',
  'xlsx',
]

export type FileUploadListenerType = {
  onFileSuccess?: (filename: string) => void
  onFileError?: (filename: string) => void
  isBusy?: (busy: boolean) => void
}

type UploadFileDialogProps = {
  children: React.ReactNode
  workspaceId: string
  fileTypeFilter?: string[]
  listener?: FileUploadListenerType
}

export function UploadFileDialog({
  children,
  workspaceId,
  fileTypeFilter,
  listener,
}: UploadFileDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [drag, setDrag] = useState(false)

  const router = useRouter()

  const acceptFilter = () => {
    fileTypeFilter = fileTypeFilter || allFileTypes

    const accept = new Map<string, string[]>()

    fileTypeFilter.forEach((fileType) => {
      const mimeType = mime.lookup(fileType)
      if (!mimeType) return
      accept.set(mimeType, [...(accept.get(mimeType) || []), `.${fileType}`])
    })

    return accept
  }

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 50,
    maxSize: 5 * 1024 * 1024, // 5MB
    accept: Object.fromEntries(acceptFilter()),
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
    onDropRejected(fileRejections) {
      const code = fileRejections[0].errors[0].code

      if (code === 'file-invalid-type') {
        toast.error(`Invalid file type. Must be on of the following: ${fileTypeFilter}`)
      } else if (code === 'file-too-large') {
        toast.error('File is too large. Please upload a file less than 5MB.')
      } else {
        toast.error('There was a problem uploading the file. Please try again.')
      }
      listener?.onFileError?.(fileRejections[0].file.name)
    },
    onDropAccepted: (acceptedFiles) => {
      toast.success(
        'Files uploaded successfully. Loading the file into the workspace will take betwen 1-5 minutes'
      )
      listener?.onFileSuccess?.(acceptedFiles[0].name)
    },
  })

  // Add workspace via API
  function uploadFile(uploadFiles: File[]) {
    setIsUploading(true)
    listener?.isBusy?.(true)

    Promise.all(uploadFiles.map(uploadSingleFile)).then(() => {
      setIsUploading(false)
      router.refresh()
      setIsOpen(false)
    })
  }

  async function uploadSingleFile(file: File) {
    const body = JSON.stringify({ filename: file.name, contentType: file.type })

    const response = await fetch(`/api/workspace/${workspaceId}/files`, { method: 'POST', body })

    try {
      if (response.ok) {
        const { url, fields } = await response.json()

        const formData = new FormData()
        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value as string)
        })
        formData.append('file', file)

        await fetch(url, {
          method: 'POST',
          body: formData,
        })

        listener?.onFileSuccess?.(file.name)
      } else {
        toast.error('There was an error uploading one or more. Please try again')
        listener?.onFileError?.(file.name)
      }
    } catch (error) {
      toast.error('There was an error uploading one or more. Please try again')
      listener?.onFileError?.(file.name)
    }
  }

  return (
    <>
      <Button plain onClick={() => setIsOpen(true)}>
        {children}
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
                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 bg-opacity-50 rounded-lg flex flex-col items-center text-lighter">
                  <input {...getInputProps()} />
                  <DocumentIcon className="h-12 w-12 p-2" />
                  <p className="text-md text-gray-600">
                    Drag and drop your files here or click to select files
                  </p>
                </div>
              </div>
            </div>
          )}
          <p className="text-sm text-gray-400 p-2">
            Larger files could take up to 5 min to process. Contact support for help pipelining
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
