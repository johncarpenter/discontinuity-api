'use client'
import { useChat } from '@/lib/client/chatProvider'
import { llmmodels, prompts } from '@prisma/client'
import { Text } from '@/components/Base/text'
import { EllipsisVerticalIcon, PencilSquareIcon, ShareIcon } from '@heroicons/react/24/outline'
import { EditPromptDialog } from '@/components/Dialogs/editpromptdialog'
import { useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { ShareDialog } from '../Dialogs/sharedialog'

type ControlBarProps = {
  organizationId: string
  models: llmmodels[]
  prompts: prompts[]
  title: string
  showShare: boolean
}

export default function ControlBar({
  organizationId,
  models,
  prompts,
  title,
  showShare = true,
}: ControlBarProps) {
  const [thread, setThread] = useChat()
  const [open, setOpen] = useState(false)
  const [openShare, setOpenShare] = useState(false)

  function changeModel(modelId: string) {
    setThread({ ...thread, modelId: modelId })
  }
  function changePrompt(promptId: string) {
    setThread({ ...thread, promptId: promptId })
  }

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b dark:border-gray-700 border-gray-200 dark:bg-gray-800 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex-1">
          <h2 className="text-normal pt-6 text-sm font-semibold ">{title.substring(0, 30)}</h2>
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <Menu>
            <Menu.Button className="inline-flex items-center gap-x-1 text-sm font-semibold dark:border-gray-700 border-gray-200 dark:bg-gray-800 bg-white text-white leading-6 ">
              <span>{models.find((model) => model.id == thread.modelId)?.name}</span>
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
                  {models.map((item) => (
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
            <Menu.Button className="inline-flex items-center gap-x-1 text-sm font-semibold dark:border-gray-700 border-gray-200 dark:bg-gray-800 bg-white text-white leading-6 ">
              <span>{prompts.find((model) => model.id == thread.promptId)?.name}</span>
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
                    <Menu.Button className="block w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600">
                      Edit Prompt
                    </Menu.Button>
                  </Menu.Item>
                  {prompts.map((item) => (
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
            <Menu.Button className="inline-flex items-center gap-x-1 text-sm font-semibold dark:border-gray-700 border-gray-200 dark:bg-gray-800 bg-white text-white leading-6 ">
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
        </div>
      </div>
      <ShareDialog open={openShare} onClose={() => setOpenShare(false)} />
      <EditPromptDialog
        open={open}
        onClose={() => setOpen(false)}
        organizationId={organizationId}
        prompt={prompts.find((model) => model.id == thread.promptId) || null}
      />
    </div>
  )
}
