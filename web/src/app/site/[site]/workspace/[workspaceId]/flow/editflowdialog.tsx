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
import { flows, FlowTypes } from '@prisma/client'
import { Textarea } from '@/app/_components/Base/textarea'
import { Select } from '@/app/_components/Base/select'

type EditFlowDialogProps = {
  workspaceId: string
  flow: flows
  open: boolean
  onClose: () => void
}

export function EditFlowDialog({ workspaceId, flow, open, onClose }: EditFlowDialogProps) {
  const [name, setName] = useState(flow?.name || '')
  const [endpoint, setEndpoint] = useState(flow?.endpoint || '')
  const [apikey, setApikey] = useState('')

  const [tags, setTags] = useState(flow?.tags || '')
  const [description, setDescription] = useState(flow?.description || '')
  const [type, setType] = useState(flow?.type || 'flow')

  const router = useRouter()

  // Add workspace via API
  function putFlowLink() {
    api(`/api/workspace/${workspaceId}/flow`, {
      body: { id: flow.id, name, endpoint, apikey, tags, description, type },
      method: 'PUT',
    }).then(() => {
      onClose()
      router.refresh()
    })
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Custom Model</DialogTitle>
        <DialogDescription>This connect a custom model to your Workspace</DialogDescription>
        <DialogBody>
          <Field>
            <Label>Model Name</Label>
            <Input
              name="name"
              placeholder="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Field>
          <Field>
            <Label>Model Description</Label>
            <Textarea
              name="description"
              placeholder="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Field>
          <Field>
            <Label>Model Type</Label>
            <Select
              name="type"
              value={type}
              onChange={(event) => setType(FlowTypes[event.target.value as keyof typeof FlowTypes])}
            >
              {Object.keys(FlowTypes).map((key, index) => (
                <option key={index} value={key}>
                  <span className="capitalize">{key.toLowerCase()}</span>
                </option>
              ))}
            </Select>
          </Field>
          <Field>
            <Label>Tags</Label>
            <Input
              name="tags"
              placeholder="tag1, tag2"
              value={tags}
              onChange={(event) => setTags(event.target.value)}
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
              placeholder="hidden"
              value={apikey}
              onChange={(event) => setApikey(event.target.value)}
            />
          </Field>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => onClose()}>
            Cancel
          </Button>
          <Button onClick={() => putFlowLink()}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
