'use client'

import { useOrganization, useUser } from '@clerk/nextjs'
import { useClerk } from '@clerk/clerk-react'
import { useRouter } from 'next/navigation'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
  ArchiveBoxIcon,
  ArrowRightCircleIcon,
  UserPlusIcon,
  XCircleIcon,
} from '@heroicons/react/20/solid'

export function AvatarImage() {
  const { user } = useUser()
  return (
    <div className="flex items-center">
      <div>
        <img
          className="inline-block h-9 w-9 rounded-full ring-1 ring-primary-200"
          src={user?.imageUrl}
          alt="User profile image"
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
  const { organization, membership } = useOrganization()

  const menuItems = [
    {
      name: 'Profile',
      href: `/profile`,
      icon: UserPlusIcon,
    },
  ]

  return (
    <Menu as="div" className="relative inline-block w-full p-2 text-left">
      <div>
        <Menu.Button className="justify-left inline-flex w-full gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-200 shadow-sm  hover:bg-gray-500">
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
        <Menu.Items className="absolute bottom-full right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-500 rounded-md bg-gray-200 shadow-lg ring-1 ring-gray-200 ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {menuItems.map((item, index) => (
              <Menu.Item key={index}>
                <a
                  href={item.href}
                  className="text-gray-600 hover:bg-gray-400 hover:text-white group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                >
                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                  {item.name}
                </a>
              </Menu.Item>
            ))}

            <Menu.Item key={98}>
              <a
                href={`/organization`}
                className="text-gray-600 hover:bg-gray-400 hover:text-white group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
              >
                <ArchiveBoxIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                Organization
              </a>
            </Menu.Item>
            {user && user?.organizationMemberships?.length > 1 && (
              <Menu.Item key={98}>
                <a
                  href={'/org-selection'}
                  className="text-gray-600 hover:bg-gray-400 hover:text-white group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                >
                  <ArrowRightCircleIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                  Switch Organization
                </a>
              </Menu.Item>
            )}
            <Menu.Item key={99}>
              <Menu.Button
                onClick={() => signOut(() => router.push('/'))}
                className="text-gray-600 hover:bg-gray-400 hover:text-white group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 w-full"
              >
                <XCircleIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                Log Out
              </Menu.Button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
