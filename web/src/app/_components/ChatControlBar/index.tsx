'use client'
import { useChat } from '@/lib/client/chatProvider'
import { llmmodels, prompts } from '@prisma/client'
import { Text } from '@/components/Base/text'
import { EllipsisVerticalIcon, PencilSquareIcon, ShareIcon } from '@heroicons/react/24/outline'
import { EditPromptDialog } from '@/components/Dialogs/editpromptdialog'
import { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { ShareDialog } from '../Dialogs/sharedialog'
import { Link } from '../Base/link'
import { useOrganization } from '@/app/_lib/client/organizationProvider'
import Avatar from '@/components/Avatar'

export default function ControlBar() {
  const [thread, setThread] = useChat()
  const [organization] = useOrganization()

  const [open, setOpen] = useState(false)
  const [openShare, setOpenShare] = useState(false)

  const [showShare, setShowShare] = useState(false)

  useEffect(() => {
    setShowShare(thread.threadId !== undefined)
  }, [thread])

  function changeModel(modelId: string) {
    setThread({ ...thread, modelId: modelId })
  }
  function changePrompt(promptId: string) {
    setThread({ ...thread, promptId: promptId })
  }

  return (
    <div className="flex shrink-0 items-center gap-x-4 ">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 dark:text-white text-gray-800 justify-end">
        <div className="flex items-center gap-x-4 lg:gap-x-6 ">
          <Menu>
            <Menu.Button className="inline-flex items-center gap-x-1 text-sm font-semibold text-normal leading-6 ">
              <span>
                {
                  organization?.llmmodels.find((model: llmmodels) => model.id == thread.modelId)
                    ?.name
                }
              </span>
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Menu.Items className="absolute top-10 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4">
                <div className="w-56 shrink bg-white dark:bg-gray-800 dark:border-gray-600 rounded border text-normal p-4 text-sm font-semibold shadow-lg ring-1 ring-gray-900/5 flex flex-col items-start">
                  {organization?.llmmodels.map((item: llmmodels) => (
                    <Menu.Item key={item.id}>
                      <Menu.Button
                        className="block w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => changeModel(item.id)}
                      >
                        {item.name}
                      </Menu.Button>
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

          <Menu>
            <Menu.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 ">
              <span>
                {organization?.prompts.find((model: prompts) => model.id == thread.promptId)?.name}
              </span>
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Menu.Items className="absolute top-10 z-10 mt-5 flex w-screen max-w-min right-0 px-4">
                <div className="w-56 shrink bg-white dark:bg-gray-800 dark:border-gray-600 rounded border text-normal p-4 text-sm font-semibold shadow-lg ring-1 ring-gray-900/5 flex flex-col items-start">
                  <Menu.Item>
                    <Menu.Button
                      className="block w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => setOpen(true)}
                    >
                      <div className="flex-1 flex flex-row">
                        <PencilSquareIcon className="w-4 h-4 my-auto mr-2" />
                        <Text>Edit Prompt</Text>
                      </div>
                    </Menu.Button>
                  </Menu.Item>
                  {organization?.prompts.map((item: prompts) => (
                    <Menu.Item key={item.id}>
                      <Menu.Button
                        className="block w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => changePrompt(item.id)}
                      >
                        {item.name}
                      </Menu.Button>
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <Menu>
            <Menu.Button className="inline-flex items-center gap-x-1 text-sm font-semibold  leading-6 ">
              <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Menu.Items className="absolute top-10 z-10 mt-5 flex w-screen max-w-min right-0 px-4">
                <div className="w-56 shrink bg-white dark:bg-gray-800 dark:border-gray-600 rounded border text-normal p-4 text-sm font-semibold shadow-lg ring-1 ring-gray-900/5 flex flex-col items-start">
                  <Menu.Item>
                    <Menu.Button className="block w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600">
                      <Link href="/app/prompts">
                        <div className="flex-1 flex flex-row">
                          <PencilSquareIcon className="w-4 h-4 my-auto mr-2" />
                          <Text>Manage Prompts</Text>
                        </div>
                      </Link>
                    </Menu.Button>
                  </Menu.Item>
                  {showShare && (
                    <Menu.Item>
                      <Menu.Button
                        className="block w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => setOpenShare(true)}
                      >
                        <div className="flex-1 flex flex-row">
                          <ShareIcon className="w-4 h-4 my-auto mr-2" />
                          <Text>Save Thread</Text>
                        </div>
                      </Menu.Button>
                    </Menu.Item>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <Avatar />
        </div>
      </div>
      <ShareDialog open={openShare} onClose={() => setOpenShare(false)} />
      <EditPromptDialog
        open={open}
        onClose={() => setOpen(false)}
        organizationId={organization?.id || ''}
        prompt={organization?.prompts.find((model: prompts) => model.id == thread.promptId) || null}
      />
    </div>
  )
}
