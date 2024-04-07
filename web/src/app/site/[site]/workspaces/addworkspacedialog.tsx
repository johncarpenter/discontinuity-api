'use client'

import api from '@/lib/client/api'
import { Button } from '@/components/Base/button'
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '@/components/Base/dialog'
import { Field, Label } from '@/components/Base/fieldset'
import { Input } from '@/components/Base/input'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function AddWorkspaceDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const [name, setName] = useState('')

  const router = useRouter()

  // Add workspace via API
  function addWorkspace() {
    api('/api/workspaces', {
      body: { name },
      method: 'POST',
    }).then(() => {
      setIsOpen(false)
      router.refresh()
    })
  }

  return (
    <>
      <Button color="secondary" type="button" onClick={() => setIsOpen(true)}>
        Add Workspace
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Add Workspace</DialogTitle>
        <DialogDescription>This will add a new workspace to your organization.</DialogDescription>
        <DialogBody>
          <Field>
            <Label>Workspace Name</Label>
            <Input
              name="name"
              placeholder="Short Workspace Name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Field>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => addWorkspace()}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
