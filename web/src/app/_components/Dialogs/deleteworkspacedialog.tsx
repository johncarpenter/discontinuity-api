'use client'

import { Button } from '@/components/Base/button'
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '@/components/Base/dialog'
import { useRouter } from 'next/navigation'
import api from '@/lib/client/api'
import toast from 'react-hot-toast'

export type DeleteWorkspaceDialogProps = {
  workspaceId: string
  open: boolean
  onClose: () => void
}

export const DeleteWorkspaceDialog = ({
  workspaceId,
  open,
  onClose,
}: DeleteWorkspaceDialogProps) => {
  const router = useRouter()

  function deleteWorkspace(workspaceId: string) {
    api(`/api/workspace/${workspaceId}`, {
      method: 'DELETE',
    }).then((response) => {
      if (response.status === 200) {
        toast.success('Workspace deleted')
      } else {
        toast.error('Failed to delete workspace')
      }
      onClose()
      router.refresh()
    })
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} darkMode={true}>
        <DialogTitle>Are you sure you want to archive workspace?</DialogTitle>
        <DialogDescription>
          It will no longer be available and the files will be removed. This action cannot be
          undone. ref: {workspaceId}
        </DialogDescription>
        <DialogBody></DialogBody>
        <DialogActions>
          <Button color="secondary" onClick={() => deleteWorkspace(workspaceId)}>
            Delete
          </Button>
          <Button plain onClick={() => onClose()}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
