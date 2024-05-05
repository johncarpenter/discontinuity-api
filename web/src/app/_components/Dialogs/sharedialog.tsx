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

import { Description, Field, Label } from '@/components/Base/fieldset'
import { Input } from '@/components/Base/input'
import { CopyToClipboard } from '../CopyToClipboard'
import { ClipboardIcon } from '@heroicons/react/24/outline'

type ShareDialogProps = {
  children: React.ReactNode
  shareLink: string
}

export function ShareDialog({ children, shareLink }: ShareDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button plain onClick={() => setIsOpen(true)}>
        {children}
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen} darkMode={true}>
        <DialogTitle>Share Your Results</DialogTitle>
        <DialogDescription></DialogDescription>
        <DialogBody>
          <Field>
            <Label>Permanent Link</Label>
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
