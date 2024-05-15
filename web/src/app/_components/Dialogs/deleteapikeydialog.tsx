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

export type DeleteApiKeyDialogProps = {
  workspaceId: string
  apikeyId: string
  open: boolean
  onClose: () => void
}

export const DeleteApiKeyDialog = ({
  workspaceId,
  apikeyId,
  open,
  onClose,
}: DeleteApiKeyDialogProps) => {
  const router = useRouter()

  function deleteApiKey(workspaceId: string, apikeyId: string) {
    api(`/api/workspace/${workspaceId}/apikey/${apikeyId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success(' API Key removed')
        } else {
          toast.error('Failed to archive key')
        }
        onClose()
        router.refresh()
      })
      .catch(() => {
        toast.error('Sorry, there was an error deleting that model')
      })
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} darkMode={true}>
        <DialogTitle>Are you sure you want to remove this key?</DialogTitle>
        <DialogDescription>
          Removing a key will break any existing integrations with this key. ref: {apikeyId}
        </DialogDescription>
        <DialogBody></DialogBody>
        <DialogActions>
          <Button color="secondary" onClick={() => deleteApiKey(workspaceId, apikeyId)}>
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
