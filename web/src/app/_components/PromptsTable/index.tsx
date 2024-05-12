import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import moment from 'moment'
import { prompts } from '@prisma/client'
import PromptItemMenu from './itemtable'
import { Badge } from '../Base/badge'

export default async function PromptsTable() {
  const { organization } = await useCurrentOrganization()

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <ul className="divide-y divide-gray-600/80">
        {organization.prompts.map((prompt: prompts) => (
          <li key={prompt.id} className="flex items-center gap-x-6 py-5">
            <div className="flex flex-1 items-start gap-x-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500 bg-gradient-to-br from-primary-600 to-primary-400 ">
                <span className="font-medium leading-none text-white">
                  {prompt.name?.substring(0, 1) || 'M'}
                </span>
              </span>
              <div className="flex flex-col">
                <div className="flex items-center gap-x-6">
                  <p className="text-base text-normal">{prompt.name}</p>
                  {prompt.isPrivate && <Badge color="secondary">Private</Badge>}
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-lighter">
                  <p className="truncate">
                    Created {moment(prompt.createdAt).format('MMMM D, YYYY')}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-none items-center gap-x-4">
              <PromptItemMenu organizationId={organization.id} prompt={prompt} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
