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
import { Text } from '@/components/Base/text'
import { Textarea } from '@/components/Base/textarea'
import toast from 'react-hot-toast'
import { Checkbox, CheckboxField, CheckboxGroup } from '../Base/checkbox'

export function AddWorkspaceDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isBusy, setIsBusy] = useState(false)
  const [isPrivate, setIsPrivate] = useState(false)

  const router = useRouter()

  // Add workspace via API
  function addWorkspace() {
    setIsBusy(true)
    try {
      api('/api/workspaces', {
        body: { name, description, isPrivate },
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

  return (
    <>
      <Button color="secondary" type="button" onClick={() => setIsOpen(true)}>
        Add Workspace
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen} darkMode={true}>
        <DialogTitle>Add Workspace</DialogTitle>
        <DialogDescription>This will add a new workspace to your organization.</DialogDescription>
        <DialogBody className="space-y-8">
          <Fieldset>
            <Field>
              <Legend>Workspace Name</Legend>
              <Text>Short memorable name for this workspace</Text>
              <Input
                name="name"
                placeholder="Human Resources"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Field>
          </Fieldset>
          <Fieldset>
            <Field>
              <Legend>Description</Legend>
              <Text>What is this workspace for</Text>
              <Textarea
                rows={3}
                name="description"
                placeholder="Sift through the hiring resumes for the HR team."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
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
                  <Label>Make this Workspace Private</Label>
                  <Description>The Workspace won't be visible to other team members</Description>
                </CheckboxField>
              </CheckboxGroup>
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
