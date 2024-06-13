'use client'
import { UserButton, useOrganizationList } from '@clerk/nextjs'

import Image from 'next/image'
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { Field, Fieldset } from '@/components/Base/fieldset'
import { Input } from '@/components/Base/input'
import { dark } from '@clerk/themes'
import { Button } from '@/components/Base/button'
import { AlertText, Text } from '@/components/Base/text'
import { useState } from 'react'
import api from '../_lib/client/api'

export default function Switcher() {
  const { push } = useRouter()

  const { isLoaded, setActive, createOrganization } = useOrganizationList({
    userMemberships: {
      infinite: false,
    },
  })

  const [name, setName] = useState('')
  const [isBusy, setIsBusy] = useState(false)

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  function handleValidation() {
    console.log('validating: ', name)
    let pass = true
    if (!name || name === '') {
      setErrors({ name: 'Name is required' })
      pass = false
    }

    if (!createOrganization) {
      setErrors({ name: 'Not allowed to create organization' })
      pass = false
    }

    setTimeout(() => {
      setErrors({})
    }, 5000)

    return pass
  }
  function createOrg() {
    setIsBusy(true)
    if (handleValidation() && createOrganization) {
      createOrganization({ name }).then((res) => {
        if (res) {
          console.log('Created Organization', res.id)
          setActive({ organization: res.id })
          updateOrganization(res.id)
        }
      })
    }
  }

  function updateOrganization(orgId: string) {
    api(`/api/organization`, {
      method: 'POST',
      body: { name, orgId },
    })
      .then((response) => {
        console.log('response', response)
        if (response.status === 200) {
          push('/app')
        } else {
          setErrors({ name: 'We are having some problems creating the organization' })
        }
        setIsBusy(false)
      })
      .catch((e) => {
        console.error('Error creating organization', e)
        setIsBusy(false)
        setErrors({ name: 'We are having some problems creating the organization: E2' })
      })
  }

  return (
    <main className="dark w-full h-full bg-gray-800 min-w-full">
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="flex flex-shrink-0 justify-end min-w-full pr-4 my-4">
            <UserButton
              appearance={{
                baseTheme: dark,
              }}
              showName={true}
            />
          </div>
          <div className="flex-1 w-full max-w-sm lg:w-96 mt-40">
            {!isLoaded && <div>Loading...</div>}
            {isLoaded && (
              <>
                <div className="text-base leading-7 text-gray-700 lg:max-w-lg pb-8">
                  <p className="text-base font-semibold leading-7 text-secondary-600 uppercase">
                    GETTING STARTED
                  </p>
                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-normal sm:text-4xl">
                    Let&apos;s get you started. Choose an organization name
                  </h1>
                </div>
                <div className="flex flex-col w-full">
                  <Fieldset className="sm:col-span-4">
                    <Field>
                      <Input
                        name="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                        placeholder="Organization Name"
                        onKeyUp={(e) => {
                          if (e.key === 'Enter' && name.length > 0) {
                            createOrg()
                          }
                        }}
                      />
                    </Field>
                    {errors['name'] && (
                      <AlertText className="text-secondary-400">{errors['name']}</AlertText>
                    )}
                  </Fieldset>
                  <Button color="secondary" className="mt-6" onClick={createOrg} disabled={isBusy}>
                    {isBusy && (
                      <SparklesIcon className="ml-2 mt-2 h-6 w-6 text-primary-400 dark:text-gray-600 animate-spin" />
                    )}
                    <Text>Next</Text>
                    <ArrowRightIcon
                      className="h-4 w-4 text-gray-400 float-right"
                      aria-hidden="true"
                    />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 md:block">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            fill
            src="/images/card_2.png"
            priority
            alt="Painting of workers within a field"
          />
        </div>
      </div>
    </main>
  )
}
