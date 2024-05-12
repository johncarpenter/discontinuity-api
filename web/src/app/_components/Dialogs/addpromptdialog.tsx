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
import { Description, Field, Fieldset, Label, Legend } from '@/components/Base/fieldset'
import { Input } from '@/components/Base/input'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AlertText, Text } from '@/components/Base/text'
import toast from 'react-hot-toast'
import { Textarea } from '../Base/textarea'
import { Checkbox, CheckboxField, CheckboxGroup } from '@/components/Base/checkbox'

export function AddPromptDialog({ organizationId }: { organizationId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isBusy, setIsBusy] = useState(false)

  const [name, setName] = useState('')
  const [prompt, setPrompt] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)

  const router = useRouter()

  // Add workspace via API
  function addPrompt() {
    if (handleValidation()) {
      try {
        setIsBusy(true)
        api(`/api/organization/${organizationId}/prompt`, {
          body: { name, prompt, isPrivate },
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
            toast.error('Sorry, there was an error adding that prompt')
          })
      } catch (e) {
        setIsOpen(false)
        setIsBusy(false)
        toast.error('Sorry, there wan an error adding that prompt')
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

    if (!prompt || prompt === '') {
      setErrors({ prompt: 'Prompt is required' })
      pass = false
    }

    setTimeout(() => {
      setErrors({})
    }, 5000)

    return pass
  }

  return (
    <>
      <Button color="dark" type="button" onClick={() => setIsOpen(true)}>
        Add Prompt
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen} darkMode={true}>
        <DialogTitle>Add a Custom Prompt</DialogTitle>
        <DialogDescription>
          Custom prompts are the first and best way to improve your results
        </DialogDescription>
        <DialogBody className="space-y-8">
          <Fieldset>
            <Field>
              <Legend>Prompt Name</Legend>
              <Text>Short memorable name for this model</Text>
              <Input
                name="name"
                placeholder="Resume Reviewer"
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
              <Label>Prompt</Label>
              <Textarea
                rows={5}
                name="prompt"
                placeholder="You are a hiring manager at a company and you need to review a resume. Write a response to the candidate."
                required
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
              />
              {errors['prompt'] && (
                <AlertText className="text-secondary-400">Prompt is required</AlertText>
              )}
            </Field>
          </Fieldset>
          <Fieldset>
            <Field>
              <Legend>Private</Legend>
              <CheckboxGroup>
                <CheckboxField>
                  <Checkbox
                    name="discoverability"
                    checked={isPrivate}
                    onChange={(event) => setIsPrivate(event)}
                  />
                  <Label>Make this Prompt Private</Label>
                  <Description>The Prompt won't be visible to other team members.</Description>
                </CheckboxField>
              </CheckboxGroup>
            </Field>
          </Fieldset>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button disabled={isBusy} onClick={() => addPrompt()}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
