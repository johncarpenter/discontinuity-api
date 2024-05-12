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

export type DeletePromptDialogProps = {
  organizationId: string
  promptId: string
  open: boolean
  onClose: () => void
}

export const DeletePromptDialog = ({
  organizationId,
  promptId,
  open,
  onClose,
}: DeletePromptDialogProps) => {
  const router = useRouter()

  function deletePrompt(organizationId: string) {
    api(`/api/organization/${organizationId}/prompt/${promptId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success('Model archived, API Key removed')
        } else {
          toast.error('Failed to archive model')
        }
        onClose()
        router.refresh()
      })
      .catch(() => {
        toast.error('Sorry, there was an error deleting that prompt')
      })
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} darkMode={true}>
        <DialogTitle>Are you sure you want to archive this model?</DialogTitle>
        <DialogDescription>
          This prompt will no longer be available for use. This action cannot be undone. ref:{' '}
          {promptId}
        </DialogDescription>
        <DialogBody></DialogBody>
        <DialogActions>
          <Button color="secondary" onClick={() => deletePrompt(organizationId)}>
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
