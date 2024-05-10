import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getFlowLinks } from '@/prisma/services/flow'
import moment from 'moment'
import { Button } from '@/components/Base/button'
import { FlowTypes, flows, workspaces } from '@prisma/client'
import {
  SiElastic,
  SiGithubcopilot,
  SiGooglegemini,
  SiMeta,
  SiOpenai,
  SiPython,
} from 'react-icons/si'
import { Badge } from '@/components/Base/badge'
import ItemMenu from './itemtable'
import { ServerIcon } from '@heroicons/react/24/outline'

const TypeIcon = ({ type }: { type: FlowTypes }) => {
  switch (type) {
    case FlowTypes.AGENT:
      return <SiMeta className="h-8 w-8 text-gray-600 dark:text-white/50" />
    case FlowTypes.ANTHROPIC:
      return <ServerIcon className="h-8 w-8 text-gray-600 dark:text-white/50" />
    case FlowTypes.CODEGEN:
      return <SiGithubcopilot className="h-8 w-8 text-gray-600 dark:text-white/50" />
    case FlowTypes.GEMINI:
    case FlowTypes.IMAGEGEN:
      return <SiGooglegemini className="h-8 w-8 text-gray-600 dark:text-white/50" />
    case FlowTypes.TEXTGEN:
    case FlowTypes.CODEINTEPRETER:
    case FlowTypes.OPENAI:
      return <SiOpenai className="h-8 w-8 text-gray-600 dark:text-white/50" />
    case FlowTypes.OTHERML:
      return <SiPython className="h-8 w-8 text-gray-600 dark:text-white/50" />
    case FlowTypes.RAG:
      return <SiElastic className="h-8 w-8 text-gray-600 dark:text-white/50" />
    default:
      return <ServerIcon className="h-8 w-8 text-gray-600 dark:text-white/50" />
  }
}

export default async function FlowsTable({ workspace }: { workspace: workspaces }) {
  const { orgId } = await useCurrentOrganization()

  const flowList = await getFlowLinks(workspace.id, orgId)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <ul className="divide-y divide-gray-600/80">
        {flowList.map((flow: flows) => (
          <li key={flow.id} className="flex items-center gap-x-6 py-5">
            <div className="flex-shrink-0">
              <TypeIcon type={flow.type} />
            </div>
            <div className="flex flex-1 items-start gap-x-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-x-6">
                  <p className="text-base text-normal">{flow.name}</p>
                  <p>
                    {flow.tags?.split(',').map((tag) => (
                      <Badge key={tag} color="amber" className="mx-1">
                        {tag}
                      </Badge>
                    ))}
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-lighter">
                  <p className="whitespace-nowrap">{flow.description}</p>
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
              <Button type="plain" href={`/workspace/${workspace.slug}/flow/${flow.id}`}>
                Launch<span className="sr-only">, {flow.name}</span>
              </Button>

              <ItemMenu workspaceId={workspace.id} slug={workspace.slug} flow={flow} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
