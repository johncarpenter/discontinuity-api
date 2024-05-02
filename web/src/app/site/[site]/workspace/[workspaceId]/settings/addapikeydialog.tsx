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

export function AddApiKeyDialog({ workspaceId }: { workspaceId: string }) {
  const [isOpen, setIsOpen] = useState(false)

  const [name, setName] = useState('')

  const router = useRouter()

  // Add workspace via API
  function addApiKey() {
    api(`/api/workspace/${workspaceId}/apikey`, {
      body: { name },
      method: 'POST',
    }).then((response) => {
      if (response.ok) {
        console.log('Workspace added successfully')
      } else {
        console.error('Failed to add workspace')
      }
      setIsOpen(false)
      router.refresh()
    })
  }

  return (
    <>
      <Button color="secondary" type="button" onClick={() => setIsOpen(true)}>
        Create API Key
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen} darkMode={true}>
        <DialogTitle>Create API Key</DialogTitle>
        <DialogDescription>This will add a new API key to your organization.</DialogDescription>
        <DialogBody>
          <Field>
            <Label>Short Name</Label>
            <Input
              name="name"
              placeholder="Short API Key Name"
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
          <Button onClick={() => addApiKey()}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
