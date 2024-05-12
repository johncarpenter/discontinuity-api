'use client'
import { Select } from '@/components/Base/select'
import { useChat } from '@/lib/client/chatProvider'
import { llmmodels, prompts } from '@prisma/client'
import { Text } from '@/components/Base/text'
import { PencilSquareIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { Button } from '../Base/button'
import { EditPromptDialog } from '@/components/Dialogs/editpromptdialog'
import { useState } from 'react'

type ControlBarProps = {
  organizationId: string
  models: llmmodels[]
  prompts: prompts[]
  title: string
}

export default function ControlBar({ organizationId, models, prompts, title }: ControlBarProps) {
  const [thread, setThread] = useChat()
  const [open, setOpen] = useState(false)

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b dark:border-gray-700 border-gray-200 dark:bg-gray-700 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex-1">
          <h2 className="text-normal pt-4 text-xl">{title}</h2>
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div className="flex flex-row ">
            <Text className="my-auto mr-2">Model</Text>
            <Select
              name="Model"
              value={thread.modelId}
              onChange={(event) => setThread({ ...thread, modelId: event.target.value })}
            >
              {models.map((model: llmmodels, index) => (
                <option key={index} value={model.id} className="capitalize">
                  {model.name}
                </option>
              ))}
            </Select>
          </div>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

          <div className="flex flex-row ">
            {prompts && (
              <>
                <Text className="my-auto mr-2">Prompt</Text>
                <Select
                  name="Prompt"
                  value={thread.promptId}
                  onChange={(event) => setThread({ ...thread, promptId: event.target.value })}
                >
                  {prompts.map((prompt: prompts, index) => (
                    <option key={index} value={prompt.id} className="capitalize">
                      {prompt.name}
                    </option>
                  ))}
                </Select>
              </>
            )}
            {prompts && prompts.find((prompt) => prompt.id === thread.promptId) !== null && (
              <>
                <Button className=" my-auto ml-2" plain onClick={() => setOpen(true)}>
                  <PencilSquareIcon className="h-6 w-6 text-gray-400" />
                </Button>
                <EditPromptDialog
                  organizationId={organizationId}
                  prompt={prompts.find((prompt) => prompt.id === thread.promptId)}
                  open={open}
                  onClose={() => setOpen(false)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
