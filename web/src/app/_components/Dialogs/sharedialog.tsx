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

import { Description, Field, Fieldset, Label } from '@/components/Base/fieldset'
import { Input } from '@/components/Base/input'
import { CopyToClipboard } from '../CopyToClipboard'
import { ClipboardIcon } from '@heroicons/react/24/outline'
import { useWorkspace } from '@/lib/client/workspaceProvider'
import api from '@/lib/client/api'
import toast from 'react-hot-toast'
import { useChat } from '@/lib/client/chatProvider'

type ShareDialogProps = {
  open: boolean
  onClose: () => void
}

export function ShareDialog({ open, onClose }: ShareDialogProps) {
  const [isBusy, setIsBusy] = useState(false)

  const [thread] = useChat()

  const [workspace] = useWorkspace()

  const [name, setName] = useState('')

  const shareLink = `${thread.link}${thread.threadId}`

  function addThread() {
    setIsBusy(true)
    try {
      api(`/api/workspace/${workspace?.id}/thread`, {
        method: 'POST',
        body: {
          name,
          shareLink,
          threadId: thread.threadId,
          model: thread.modelId,
          prompt: thread.promptId,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            toast.success('Thread saved')
          } else {
            toast.error('Failed to add thread')
          }
          setIsBusy(false)
          onClose()
        })
        .catch(() => {
          onClose()
          setIsBusy(false)
          toast.error('Sorry, there wan an error saving your thread')
        })
    } catch (e) {
      onClose()
      setIsBusy(false)
      toast.error('Sorry, there wan an error saving your thread')
    }
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} darkMode={true}>
        <DialogTitle>Save to Threads</DialogTitle>
        <DialogDescription></DialogDescription>
        <DialogBody>
          <Fieldset className="space-y-2">
            <Field>
              <Label>Thread Name</Label>
              <Input
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </Field>

            <Field>
              <Label>Direct Link</Label>
              <div className="flex flex-row w-full">
                <Input
                  name="shareLink"
                  required
                  value={shareLink}
                  onFocus={(event) => event.currentTarget.select()}
                />
                <CopyToClipboard copyText={shareLink}>
                  <ClipboardIcon className="h-5 w-5 ml-2 mt-2 text-gray-400" aria-hidden="true" />
                </CopyToClipboard>
              </div>
              <Description>Available to Team Members</Description>
            </Field>
          </Fieldset>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => onClose()}>
            Cancel
          </Button>
          <Button plain disabled={isBusy} onClick={addThread}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
