import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import moment from 'moment'
import { Button } from '@/components/Base/button'
import { workspaces } from '@prisma/client'
import { getThreadsForUser } from '@/prisma/services/threads'
import { CopyToClipboard } from '@/components/CopyToClipboard'
import { ClipboardIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import useCurrentUser from '@/lib/client/useCurrentUser'

export default async function ThreadsTable({ workspace }: { workspace: workspaces }) {
  const { id } = await useCurrentOrganization()
  const { id: userId } = await useCurrentUser()
  const threadList = await getThreadsForUser(userId, workspace.id, id)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <ul className="divide-y divide-gray-600/80">
        {threadList.map((thread: any) => (
          <li key={thread.id} className="flex items-center gap-x-6 py-5">
            <div className="flex flex-1 items-start gap-x-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-x-6">
                  <p className="text-base text-normal">{thread.name}</p>
                </div>

                <div className="mt-1 flex flex-row items-center gap-x-2 text-xs leading-5 text-lighter">
                  {thread.creator?.fullName}
                  <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <p className="truncate">
                    Created {moment(thread.createdAt).format('MMMM D, YYYY')}
                  </p>
                </div>
                <div className="mt-1 items-center text-xs leading-5 text-lighter  hidden md:block">
                  Share Link
                  <div className="flex flex-row w-full">
                    <CopyToClipboard copyText={thread.link}>
                      <div
                        className={clsx(
                          // Basic layout
                          'relative flex flex-row w-full align-middle appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)]',

                          // Typography
                          'text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-gray-400',

                          // Border
                          'border border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20',

                          // Background color
                          'bg-transparent dark:bg-white/5'
                        )}
                      >
                        {thread.link}
                        <ClipboardIcon className="h-5 w-5 ml-3 text-gray-400" aria-hidden="true" />
                      </div>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-none items-center gap-x-4">
              <Button type="plain" href={thread.link}>
                Continue<span className="sr-only">, {thread.name}</span>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
