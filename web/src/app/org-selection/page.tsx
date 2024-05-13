'use client'
import { UserButton, useOrganizationList } from '@clerk/nextjs'

import Card from '@/components/Card'
import Image from 'next/image'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { Onboarding } from '@/components/Onboarding'

export default function Switcher() {
  const { push } = useRouter()

  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: false,
    },
  })

  function setAndRedirect(orgId: string) {
    if (setActive) {
      setActive({ organization: orgId })
    }
    push('/')
  }

  const EmptyOrganizations = () => (
    <div className="flex flex-col items-center justify-center h-full relative w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
      <div className="text-gray-400 text-2xl">
        <Onboarding />
      </div>
    </div>
  )

  return (
    <main className="dark flex flex-col items-center justify-center w-full h-full bg-gray-800">
      <Card>
        <div className="flex justify-end min-w-full pr-4 my-4">
          <UserButton showName={true} />
        </div>

        <h2>Let's get started</h2>
        <Onboarding />
        {!isLoaded && <div>Loading...</div>}
        {isLoaded && userMemberships && userMemberships.data.length === 0 && <EmptyOrganizations />}
        {isLoaded && userMemberships && userMemberships.data.length > 0 && (
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col w-full">
              {userMemberships.data.map((membership) => (
                <button
                  key={membership.organization.id}
                  onClick={() => setAndRedirect(membership.organization.id)}
                  className="hover:ring-1 hover:ring-primary-50"
                >
                  <div className="flex rounded-md shadow-sm p-2">
                    <div className="flex w-16 flex-shrink-0 items-center justify-center">
                      <Image
                        src={membership.organization.imageUrl}
                        width={24}
                        height={24}
                        className="rounded-full"
                        alt="Organization Logo"
                      />
                    </div>
                    <div className="flex flex-1 items-center justify-between truncate rounded-r-md ">
                      <div className="truncate px-4 py-2 text-sm">
                        {membership.organization.name}
                      </div>

                      <ArrowRightIcon
                        className="h-4 w-4 text-gray-400 float-right"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </Card>
    </main>
  )
}
