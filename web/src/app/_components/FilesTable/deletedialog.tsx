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
import api from '@/lib/client/api'
import toast from 'react-hot-toast'

export type DeleteDialogProps = {
  workspaceId: string
  filename: string
}

export const DeleteDialog = ({ workspaceId, filename }: DeleteDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

  function deleteFile() {
    api(`/api/workspace/${workspaceId}/files/${filename}`, {
      method: 'DELETE',
    }).then((response) => {
      if (response.ok) {
        toast.success('File deleted')
      } else {
        toast.error('Failed to delete file')
      }
      setIsOpen(false)
      router.refresh()
    })
  }

  return (
    <>
      <Button plain type="button" onClick={() => setIsOpen(true)}>
        Delete
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen} darkMode={true}>
        <DialogTitle>Are you sure you want to delete this file?</DialogTitle>
        <DialogDescription>
          It will no longer be referenced in your vector database
        </DialogDescription>
        <DialogBody></DialogBody>
        <DialogActions>
          <Button color="secondary" onClick={() => deleteFile()}>
            Delete
          </Button>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
