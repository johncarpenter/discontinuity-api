import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getWorkspaces } from '@/prisma/services/workspace'
import moment from 'moment'
import WorkspaceItemMenu from './itemtable'
import { Text } from '@/components/Base/text'
import { Badge } from '../Base/badge'

export default async function WorkspacesTable() {
  const { id } = await useCurrentOrganization()

  const workspaces = await getWorkspaces(id)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <ul className="divide-y divide-gray-600/80">
        {workspaces.map((workspace: any) => (
          <li key={workspace.id} className="flex items-center gap-x-6 py-5">
            <div className="flex flex-1 items-start gap-x-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500 bg-gradient-to-br from-primary-600 to-primary-400 ">
                <span className="font-medium leading-none text-white">
                  {workspace.name.substring(0, 1)}
                </span>
              </span>
              <div className="flex flex-col">
                <div className="flex items-center gap-x-6">
                  <p className="text-base text-normal">{workspace.name}</p>
                  {workspace.isPrivate && <Badge color="secondary">Private</Badge>}
                </div>
                <div className="flex items-center gap-x-6">
                  <Text>{workspace.description}</Text>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-lighter">
                  <p className="truncate">
                    Created {workspace.creator?.fullName}{' '}
                    {moment(workspace.createdAt).format('MMMM D, YYYY')}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-none items-center gap-x-4">
              <WorkspaceItemMenu workspaceId={workspace.id} slug={workspace.slug} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
