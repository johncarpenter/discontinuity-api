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
import { Field, Fieldset, Label, Legend } from '@/components/Base/fieldset'
import { Input } from '@/components/Base/input'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AlertText, Text } from '@/components/Base/text'
import toast from 'react-hot-toast'
import { ModelTypes } from '@prisma/client'
import { Select } from '../Base/select'

export function AddModelDialog({ organizationId }: { organizationId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isBusy, setIsBusy] = useState(false)

  const [name, setName] = useState('')
  const [source, setSource] = useState<ModelTypes>(ModelTypes.OPENAI)
  const [apikey, setApiKey] = useState('')

  const router = useRouter()

  // Add workspace via API
  function addWorkspace() {
    if (handleValidation()) {
      setIsBusy(true)
      try {
        api(`/api/organization/${organizationId}/model`, {
          body: { name, source, apikey },
          method: 'POST',
        }).then(() => {
          setIsOpen(false)
          setIsBusy(false)
          router.refresh()
        })
      } catch (e) {
        setIsOpen(false)
        setIsBusy(false)
        toast.error('Sorry, there wan an error adding workspace')
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

    if (!apikey) {
      setErrors({ apikey: 'API Key is required' })
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
        Add Model
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen} darkMode={true}>
        <DialogTitle>Add a LLM Foundation Model</DialogTitle>
        <DialogDescription>This will make the model visible organization wide</DialogDescription>
        <DialogBody className="space-y-8">
          <Fieldset>
            <Field>
              <Legend>Model Name</Legend>
              <Text>Short memorable name for this model</Text>
              <Input
                name="name"
                placeholder="OpenAI Prod"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              {errors['name'] && (
                <AlertText className="text-secondary-400">Name is required</AlertText>
              )}
            </Field>
          </Fieldset>
          <Fieldset>
            <Field>
              <Label>Model Type</Label>
              <Select
                name="source"
                value={source}
                onChange={(event) =>
                  setSource(ModelTypes[event.target.value as keyof typeof ModelTypes])
                }
              >
                {Object.keys(ModelTypes).map((key, index) => (
                  <option key={index} value={key} className="capitalize">
                    {key.toLowerCase()}
                  </option>
                ))}
              </Select>
            </Field>
          </Fieldset>
          <Fieldset>
            <Field>
              <Legend>API Key</Legend>
              <Text>Contact support if you need help locating your key</Text>
              <Input
                name="apikey"
                placeholder="sk-"
                required
                value={apikey}
                onChange={(event) => setApiKey(event.target.value)}
              />
              {errors['apikey'] && (
                <AlertText className="text-secondary-400">API Key is required</AlertText>
              )}
            </Field>
          </Fieldset>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button disabled={isBusy} onClick={() => addWorkspace()}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
