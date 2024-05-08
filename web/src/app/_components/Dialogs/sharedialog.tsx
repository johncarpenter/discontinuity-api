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

type ShareDialogProps = {
  children: React.ReactNode
  shareLink: string
}

export function ShareDialog({ children, shareLink }: ShareDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isBusy, setIsBusy] = useState(false)

  const [workspace] = useWorkspace()

  const [name, setName] = useState('')

  function addThread() {
    setIsBusy(true)
    api(`/api/workspace/${workspace?.id}/thread`, {
      method: 'POST',
      body: { name, shareLink },
    }).then((response) => {
      if (response.status === 200) {
        toast.success('Thread saved')
      } else {
        toast.error('Failed to add thread')
      }
      setIsBusy(false)
      setIsOpen(false)
    })
  }

  return (
    <>
      <Button plain onClick={() => setIsOpen(true)}>
        {children}
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen} darkMode={true}>
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
          <Button plain onClick={() => setIsOpen(false)}>
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
