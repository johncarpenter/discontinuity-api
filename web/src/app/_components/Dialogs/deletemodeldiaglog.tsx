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

export type DeleteModelDialogProps = {
  organizationId: string
  modelId: string
  open: boolean
  onClose: () => void
}

export const DeleteModelDialog = ({
  organizationId,
  modelId,
  open,
  onClose,
}: DeleteModelDialogProps) => {
  const router = useRouter()

  function deleteWorkspace(organizationId: string) {
    api(`/api/organization/${organizationId}/model/${modelId}`, {
      method: 'DELETE',
    }).then((response) => {
      if (response.status === 200) {
        toast.success('Model archived, API Key removed')
      } else {
        toast.error('Failed to archive model')
      }
      onClose()
      router.refresh()
    })
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} darkMode={true}>
        <DialogTitle>Are you sure you want to archive this model?</DialogTitle>
        <DialogDescription>
          This model will no longer be available for use and the API Key will be removed. This
          action cannot be undone. ref: {modelId}
        </DialogDescription>
        <DialogBody></DialogBody>
        <DialogActions>
          <Button color="secondary" onClick={() => deleteWorkspace(organizationId)}>
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
