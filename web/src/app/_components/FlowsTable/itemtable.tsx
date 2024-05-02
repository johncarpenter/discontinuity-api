/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint-disable-next-line jsx-a11y/click-events-have-key-events
'use client'
import { flows } from '@prisma/client'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { BeakerIcon, CodeBracketIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import Link from 'next/link'
import { EditFlowDialog } from '@/app/site/[site]/workspace/[workspaceId]/flow/editflowdialog'
import { LuLayoutDashboard } from 'react-icons/lu'
import { Text } from '@/components/Base/text'

type ItemMenuProps = {
  workspaceId: string
  slug: string
  flow: flows
}

export default function ItemMenu({ workspaceId, slug, flow }: ItemMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <EditFlowDialog
        workspaceId={workspaceId}
        flow={flow}
        open={open}
        onClose={() => setOpen(false)}
      />
      <Menu as="div" className="relative flex-none ">
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
          <MenuItems className="absolute z-100 right-0 mt-3 w-56 origin-top-right rounded-md card-normal p-2 z-50">
            <div className="py-2">
              <MenuItem>
                <Link
                  href={`/workspace/${slug}/flow/${flow.id}`}
                  className="flex flex-row px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <BeakerIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <Text>Monitor & Test</Text>
                </Link>
              </MenuItem>

              <MenuItem>
                <span
                  onClick={() => setOpen(true)}
                  className="flex flex-row px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <CodeBracketIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <Text>Edit</Text>
                </span>
              </MenuItem>

              {flow?.endpoint.includes('flow.discontinuity.ai') && (
                <MenuItem>
                  <Link
                    href={`/workspace/${slug}/flow/${flow.id}/editor`}
                    className="flex flex-row px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <LuLayoutDashboard className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <Text>Edit Workflow</Text>
                  </Link>
                </MenuItem>
              )}
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}
