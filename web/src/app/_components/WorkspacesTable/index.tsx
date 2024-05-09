import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getWorkspaces } from '@/prisma/services/workspace'
import moment from 'moment'
import { workspaces } from '@prisma/client'
import WorkspaceItemMenu from './itemtable'
import { Badge } from '@/components/Base/badge'
// Wait for the playlists

export default async function WorkspacesTable() {
  const { orgId } = await useCurrentOrganization()

  const workspaces = await getWorkspaces(orgId)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <ul className="divide-y divide-gray-600/80">
        {workspaces.map((workspace: workspaces) => (
          <li key={workspace.id} className="flex items-center gap-x-6 py-5">
            <div className="flex flex-1 items-start gap-x-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-x-6">
                  <p className="text-base text-normal">{workspace.name}</p>
                  <p>
                    <Badge color="amber" className="mx-1">
                      OpenAI
                    </Badge>
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-lighter">
                  <p className="truncate">
                    Created {moment(workspace.createdAt).format('MMMM D, YYYY')}
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
