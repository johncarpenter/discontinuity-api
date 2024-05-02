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
import { Radio, RadioField, RadioGroup } from '@/app/_components/Base/radio'
import { Text } from '@/components/Base/text'
import Image from 'next/image'

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
                placeholder="Short Workspace Name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Field>
          </Fieldset>
          <Fieldset>
            <Legend>Foundational Model</Legend>
            <Text>This is the base foundational model for all embeddings. Cannot be changed</Text>
            <RadioGroup name="foundation" defaultValue="openai">
              <RadioField>
                <Radio value="openai" />
                <Label>
                  <Image
                    width={120}
                    height={60}
                    src="/images/logos/openai.webp"
                    className="m-4"
                    alt="OpenAI logo"
                  />
                </Label>
              </RadioField>
              <RadioField>
                <Radio value="cohere" />
                <Label>
                  <Image
                    width={120}
                    height={60}
                    src="/images/logos/cohere.webp"
                    className="m-4"
                    alt="Cohere logo"
                  />
                </Label>
              </RadioField>
              <RadioField>
                <Radio value="anthropic" />
                <Label>
                  <Image
                    width={120}
                    height={60}
                    src="/images/logos/anthropic.webp"
                    className="m-4"
                    alt="Anthropic logo"
                  />
                </Label>
              </RadioField>
            </RadioGroup>
          </Fieldset>
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
