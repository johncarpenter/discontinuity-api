'use server'
import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getFlowLinks } from '@/prisma/services/flow'
import moment from 'moment'
import { Button } from '@/components/Base/button'
import { flows, workspaces } from '@prisma/client'
import { SiOpenai } from 'react-icons/si'
import { Badge } from '@/components/Base/badge'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { BeakerIcon, CodeBracketIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
// Wait for the playlists

export default async function FlowsTable({ workspace }: { workspace: workspaces }) {
  const organizationId: string = await useCurrentOrganization()

  const flowList = await getFlowLinks(workspace.id, organizationId)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <ul className="divide-y divide-gray-100">
        {flowList.map((flow: flows) => (
          <li key={flow.id} className="flex items-center gap-x-6 py-5">
            <div className="flex-shrink-0">
              <SiOpenai className="h-8 w-8 text-gray-600" />
            </div>
            <div className="flex flex-1 items-start gap-x-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-x-6">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{flow.name}</p>
                  <p>
                    <Badge color="amber">OpenAI</Badge>
                    <Badge color="amber">Text</Badge>
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  <p className="whitespace-nowrap">Description</p>
                  <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <p className="truncate">
                    Created {moment(flow.createdAt).format('MMMM D, YYYY')}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-none items-center gap-x-4">
              <Button
                color="light"
                type="plain"
                href={`/workspace/${workspace.slug}/flow/${flow.id}`}
              >
                Launch<span className="sr-only">, {flow.name}</span>
              </Button>

              <Menu as="div" className="relative flex-none">
                <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                </MenuButton>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute z-100 right-0 mt-3 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <MenuItem>
                        <BeakerIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span>Monitor & Test</span>
                      </MenuItem>
                      <MenuItem>
                        <CodeBracketIcon
                          className="mr-3 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>Edit</span>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
