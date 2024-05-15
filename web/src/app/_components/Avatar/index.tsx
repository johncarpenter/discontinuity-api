'use client'

import { useUser } from '@clerk/nextjs'
import { useClerk } from '@clerk/clerk-react'
import { useRouter } from 'next/navigation'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ArrowRightCircleIcon, UserPlusIcon, XCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import { Text } from '@/components/Base/text'

export function AvatarImage() {
  const { user } = useUser()
  return (
    <div className="flex items-center">
      <div>
        <Image
          className="inline-block h-9 w-9 rounded-full ring-1 ring-primary-200"
          src={user?.imageUrl ?? '/images/avatar.svg'}
          alt="User profile"
          width={36}
          height={36}
        />
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-white group-hover:text-gray-900">
          {user?.fullName ? user.fullName : user?.emailAddresses[0].emailAddress}
        </p>
      </div>
    </div>
  )
}

export default function Avatar() {
  const { signOut } = useClerk()
  const router = useRouter()
  const { user } = useUser()

  const menuItems = [
    {
      name: 'Profile',
      href: `/app/profile`,
      icon: UserPlusIcon,
    },
  ]

  return (
    <Menu as="div" className="relative inline-block w-full p-2 text-left dark">
      <div>
        <Menu.Button className="justify-left inline-flex w-full gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm hover:bg-gray-500">
          <AvatarImage />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute bottom-full right-0 z-10 mt-2 w-56 origin-top-right rounded-md divide-y divide-gray-200 dark:divide-gray-600/60 border bg-white dark:bg-black dark:border-gray-500 shadow sm:rounded-lg p-2 ">
          <div className="py-1 space-y-2">
            {menuItems.map((item, index) => (
              <Menu.Item key={index}>
                <Link
                  href={item.href}
                  className="flex flex-row px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <item.icon className="h-6 w-6 mr-2 text-gray-400" aria-hidden="true" />
                  <Text>{item.name}</Text>
                </Link>
              </Menu.Item>
            ))}

            {user && user?.organizationMemberships?.length > 1 && (
              <Menu.Item key={99}>
                <Link
                  href={'/org-selection'}
                  className="flex flex-row px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <ArrowRightCircleIcon className="h-6 w-6 mr-2 text-gray-400" aria-hidden="true" />
                  <Text>Switch Organization</Text>
                </Link>
              </Menu.Item>
            )}
            <Menu.Item key={100}>
              <Menu.Button
                onClick={() => signOut(() => router.push('/'))}
                className="flex flex-row px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600 w-full"
              >
                <XCircleIcon className="h-6 w-6 mr-2 text-gray-400" aria-hidden="true" />
                <Text> Log Out</Text>
              </Menu.Button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
