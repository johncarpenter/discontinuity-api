'use client'
import { Select } from '@/components/Base/select'
import { useChat } from '@/lib/client/chatProvider'
import { llmmodels, prompts } from '@prisma/client'
import { Text } from '@/components/Base/text'

type ControlBarProps = {
  models: llmmodels[]
  prompts: prompts[]
  title: string
}

export default function ControlBar({ models, prompts, title }: ControlBarProps) {
  const [thread, setThread] = useChat()

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
                  value={thread.modelId}
                  onChange={(event) => setThread({ ...thread, modelId: event.target.value })}
                >
                  {models.map((model: llmmodels, index) => (
                    <option key={index} value={model.id} className="capitalize">
                      {model.name}
                    </option>
                  ))}
                </Select>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
