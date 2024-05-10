'use client'

import { Button } from '@/components/Base/button'

import { useState } from 'react'

import { Field, Fieldset, Label } from '@/components/Base/fieldset'
import { Input } from '@/components/Base/input'
import { LicenseType } from '@prisma/client'

import api from '@/lib/client/api'
import toast from 'react-hot-toast'
import Card from '@/components/Card'
import { Select } from '../Base/select'
import { useRouter } from 'next/navigation'

export function OnboardingForm() {
  const [isBusy, setIsBusy] = useState(false)

  const [name, setName] = useState<string>('')
  const [license, setLicense] = useState<LicenseType>(LicenseType.TRIAL)
  const [endpoint, setEndpoint] = useState<string | undefined>()

  const router = useRouter()

  function updateOrganization() {
    setIsBusy(true)
    api(`/api/organization`, {
      method: 'POST',
      body: { name, license, endpoint },
    }).then((response) => {
      if (response.status === 200) {
        toast.success('Organization saved')
        router.refresh()
      } else {
        toast.error('Failed to add thread')
      }
      setIsBusy(false)
    })
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl p-8">
          <Card>
            <Card.Title title="Configure your Organization"></Card.Title>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 px-14">
              <Fieldset className="sm:col-span-4">
                <Field>
                  <Label>Organization Name</Label>
                  <Input
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </Field>
              </Fieldset>

              <Fieldset className="sm:col-span-4">
                <Field>
                  <Label>License Type</Label>
                  <Select
                    name="type"
                    value={license}
                    onChange={(event) =>
                      setLicense(LicenseType[event.target.value as keyof typeof LicenseType])
                    }
                  >
                    {Object.keys(LicenseType).map((key, index) => (
                      <option key={index} value={key}>
                        <span className="capitalize">{key.toLowerCase()}</span>
                      </option>
                    ))}
                  </Select>
                </Field>
              </Fieldset>

              <Fieldset className="col-span-full mb-14">
                <Field>
                  <Label>Flowise Endpoint</Label>
                  <div className="flex flex-row w-full">
                    <Input
                      name="endpoint"
                      value={endpoint}
                      onChange={(event) => setEndpoint(event.target.value)}
                    />
                  </div>
                </Field>
              </Fieldset>
            </div>

            <Button plain disabled={isBusy} onClick={updateOrganization}>
              Continue
            </Button>
          </Card>
        </div>
      </div>
    </>
  )
}
