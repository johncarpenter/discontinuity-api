import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import moment from 'moment'
import { Button } from '@/components/Base/button'
import { threads, workspaces } from '@prisma/client'
import { getThreads } from '@/prisma/services/threads'

export default async function ThreadsTable({ workspace }: { workspace: workspaces }) {
  const { orgId } = await useCurrentOrganization()

  const threadList = await getThreads(workspace.id, orgId)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <ul className="divide-y divide-gray-600/80">
        {threadList.map((thread: threads) => (
          <li key={thread.id} className="flex items-center gap-x-6 py-5">
            <div className="flex flex-1 items-start gap-x-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-x-6">
                  <p className="text-base text-normal">{thread.name}</p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-lighter">
                  <p className="whitespace-nowrap">{thread.link}</p>
                  <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <p className="truncate">
                    Created {moment(thread.createdAt).format('MMMM D, YYYY')}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-none items-center gap-x-4">
              <Button type="plain" href={thread.link}>
                Launch<span className="sr-only">, {thread.name}</span>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
