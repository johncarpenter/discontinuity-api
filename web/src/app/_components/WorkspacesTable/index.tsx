import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getWorkspaces } from '@/prisma/services/workspace'
import moment from 'moment'
import { Button } from '@/components/Base/button'
import { workspaces } from '@prisma/client'
// Wait for the playlists

export default async function WorkspacesTable() {
  const organizationId: string = await useCurrentOrganization()

  const workspaces = await getWorkspaces(organizationId)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-grey-600/80">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-normal sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-normal"
                  >
                    Workspace Slug
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-normal"
                  >
                    Created
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-0">
                    <span className="sr-only">Manage</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300 dark:divide-gray-600/80">
                {workspaces.map((workspace: workspaces) => (
                  <tr key={workspace.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-lighter sm:pl-0">
                      {workspace.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-lighter">
                      {workspace.slug}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-lighter">
                      {moment(workspace.createdAt).format('MMMM D, YYYY')}
                    </td>

                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                      <Button type="plain" href={`/workspace/${workspace.slug}/settings`}>
                        Manage
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
