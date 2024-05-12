/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint-disable-next-line jsx-a11y/click-events-have-key-events
'use client'
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import { Text } from '@/components/Base/text'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { DeletePromptDialog } from '../Dialogs/deletepromptdialog'
import { EditPromptDialog } from '../Dialogs/editpromptdialog'
import { prompts } from '@prisma/client'

type PromptItemMenuProps = {
  organizationId: string
  prompt: prompts
}

export default function PromptItemMenu({ organizationId, prompt }: PromptItemMenuProps) {
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  return (
    <div>
      <DeletePromptDialog
        organizationId={organizationId}
        promptId={prompt.id}
        open={open}
        onClose={() => setOpen(false)}
      />
      <EditPromptDialog
        organizationId={organizationId}
        prompt={prompt}
        open={openEdit}
        onClose={() => setOpenEdit(false)}
      />

      <Menu as="div" className="relative flex-none ">
        <MenuButton className="-m-2.5 block p-2.5 text-gray-300 hover:text-gray-900">
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
                <span
                  className="flex flex-row px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={() => setOpenEdit(true)}
                >
                  <PencilIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <Text>Edit Prompt</Text>
                </span>
              </MenuItem>
              <MenuItem>
                <span
                  className="flex flex-row px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={() => setOpen(true)}
                >
                  <TrashIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <Text>Delete Prompt</Text>
                </span>
              </MenuItem>
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}
