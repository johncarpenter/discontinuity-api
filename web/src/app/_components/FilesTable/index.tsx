'use client'
import moment from 'moment'
import { Link } from '@/components/Base/link'

import { DeleteDialog } from './deletedialog'

import useFiles from '@/app/_lib/client/useFiles'
import { SparklesIcon } from '@heroicons/react/24/outline'
// Wait for the playlists

export default function FilesTable({ workspaceId }: { workspaceId: string }) {
  // const files = await getFiles({ workspaceId })
  // const dbfiles = await getFilesForWorkspace(workspaceId)

  // function humanFileSize(size: number) {
  //   const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
  //   return (
  //     Number((size / Math.pow(1024, i)).toFixed(2)) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
  //   )
  // }
  const { files: dbfiles, isLoading, isError } = useFiles({ workspaceId })

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {isLoading && (
              <div>
                <SparklesIcon className="ml-2 mt-2 h-6 w-6 text-primary-400 dark:text-gray-400 animate-spin" />{' '}
                Loading...
              </div>
            )}
            {isError && (
              <div>
                Sorry we are having some problems reading your files. Please refresh and try again
              </div>
            )}
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
                    Size
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-normal"
                  >
                    Uploaded
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-0">
                    <span className="sr-only">Manage</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-gray-300 dark:divide-gray-600/80">
                {dbfiles &&
                  dbfiles.map((file: any) => (
                    <tr key={file.filename}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-lighter sm:pl-0">
                        <Link href={`/api/workspace/${workspaceId}/files/${file.filename}`}>
                          {file.filename}
                        </Link>
                      </td>

                      <td className="whitespace-nowrap px-3 py-4 text-sm text-lighter">
                        {/* {humanFileSize(file.size)} */ file.status}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-lighter">
                        {moment(file.updatedAt).format('MMMM D, YYYY')}
                      </td>

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                        <DeleteDialog workspaceId={workspaceId} filename={file.filename} />
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
