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
import toast from 'react-hot-toast'
import { AlertText } from '@/app/_components/Base/text'

type AddFlowDialogProps = {
  workspaceId: string
  flow?: flows
}

export function AddFlowDialog({ workspaceId, flow }: AddFlowDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const [name, setName] = useState(flow?.name || '')
  const [endpoint, setEndpoint] = useState(flow?.endpoint || '')
  const [apikey, setApikey] = useState('')

  const [tags, setTags] = useState(flow?.tags || '')
  const [description, setDescription] = useState(flow?.description || '')
  const [type, setType] = useState(flow?.type || FlowTypes.OPENAI)

  const [isBusy, setIsBusy] = useState(false)

  const router = useRouter()

  // Add workspace via API
  function addFlowLink() {
    if (handleValidation()) {
      setIsBusy(true)
      try {
        api(`/api/workspace/${workspaceId}/flow`, {
          body: { name, endpoint, apikey, tags, description, type },
          method: 'POST',
        })
          .then(() => {
            setIsOpen(false)
            setIsBusy(false)
            router.refresh()
          })
          .catch(() => {
            setIsOpen(false)
            setIsBusy(false)
            toast.error('Sorry, there was an error adding that model')
          })
      } catch (e) {
        setIsOpen(false)
        setIsBusy(false)
        toast.error('Sorry, there wan an error adding that model')
      }
    }
  }

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  function handleValidation() {
    let pass = true
    if (!name || name === '') {
      setErrors({ name: 'Name is required' })
      pass = false
    }

    if (!endpoint || endpoint === '') {
      setErrors({ endpoint: 'Endpoint is required' })
      pass = false
    }

    setTimeout(() => {
      setErrors({})
    }, 5000)

    return pass
  }

  return (
    <>
      <Button color="secondary" type="button" onClick={() => setIsOpen(true)}>
        Add Flow
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen} darkMode={true}>
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
            {errors['name'] && (
              <AlertText className="text-secondary-400">Name is required</AlertText>
            )}
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
                  {key.toLowerCase()}
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
            {errors['endpoint'] && (
              <AlertText className="text-secondary-400">Endpoint is required</AlertText>
            )}
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
          <Button disabled={isBusy} onClick={() => addFlowLink()}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
