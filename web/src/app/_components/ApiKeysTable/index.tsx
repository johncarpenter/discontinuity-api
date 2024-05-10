import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getApiKeys } from '@/prisma/services/apikey'
import { Button } from '@/components/Base/button'
import { apikeys } from '@prisma/client'
import { CopyToClipboard } from '@/components/CopyToClipboard'
import { ClipboardIcon } from '@heroicons/react/24/outline'
// Wait for the playlists

export default async function ApiKeysTable({ workspaceId }: { workspaceId: string }) {
  const { orgId } = await useCurrentOrganization()

  const apiKeys = await getApiKeys(workspaceId, orgId)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600/80">
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
                    Client ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-normal"
                  >
                    Client Secret
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-0">
                    <span className="sr-only">Manage</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600/80">
                {apiKeys.map((key: apikeys) => (
                  <>
                    {key.name !== 'default' && (
                      <tr key={key.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-lighter sm:pl-0">
                          {key.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-lighter">
                          {key.client_id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-lighter flex">
                          ****
                          <CopyToClipboard copyText={key.client_secret}>
                            <ClipboardIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </CopyToClipboard>
                        </td>

                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                          <Button type="plain" href={`/workspace/settings`}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
