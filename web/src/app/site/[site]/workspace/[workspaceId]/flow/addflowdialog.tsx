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

export function AddFlowDialog({ workspaceId }: { workspaceId: string }) {
  const [isOpen, setIsOpen] = useState(false)

  const [name, setName] = useState('')
  const [endpoint, setEndpoint] = useState('')
  const [apikey, setApikey] = useState('')

  const router = useRouter()

  // Add workspace via API
  function addFlowLink() {
    api(`/api/workspace/${workspaceId}/flow`, {
      body: { name, endpoint, apikey },
      method: 'POST',
    }).then(() => {
      setIsOpen(false)
      router.refresh()
    })
  }

  return (
    <>
      <Button color="secondary" type="button" onClick={() => setIsOpen(true)}>
        Add Model
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Add Custom Model</DialogTitle>
        <DialogDescription>This connect a custom model to your Workspace</DialogDescription>
        <DialogBody>
          <Field>
            <Label>Model Name</Label>
            <Input
              name="name"
              placeholder="model name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Field>
          <Field>
            <Label>Endpoint</Label>
            <Input
              name="endpoint"
              placeholder="https://flow.discontinuity.ai/flow/1234"
              required
              value={endpoint}
              onChange={(event) => setEndpoint(event.target.value)}
            />
          </Field>
          <Field>
            <Label>API Key for Flow Instance</Label>
            <Input
              name="apikey"
              placeholder="000-000-000-000"
              required
              value={apikey}
              onChange={(event) => setApikey(event.target.value)}
            />
          </Field>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => addFlowLink()}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
