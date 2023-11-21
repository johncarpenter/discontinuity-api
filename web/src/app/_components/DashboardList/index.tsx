import { Dashboard } from '@/lib/server/organizations'
import { DashboardIcon } from '../DashboardIcon'

const people = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    department: 'Optimization',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
]

export interface DashboardListProps {
  dashboards: Dashboard[]
}

export default function DashboardList({ dashboards }: DashboardListProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-primary-700">All Dashboards</h1>
          <p className="mt-2 text-sm text-gray-700">
            All current active dashboards within your organization.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Type
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Visit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {dashboards.map((dashboard) => (
                  <tr key={dashboard.slug}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <a
                        href={`/dashboard/${dashboard.slug}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <div className="flex items-center">
                          <div className="h-11 w-11 flex-shrink-0">
                            <DashboardIcon dashboard={dashboard} className="w-6 h-6" />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{dashboard.title}</div>
                            <div className="mt-1 text-gray-500">
                              {dashboard.description.substring(0, 100)}
                            </div>
                          </div>
                        </div>
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {dashboard.type}
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a
                        href={`/dashboard/${dashboard.slug}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Visit<span className="sr-only">, {dashboard.title}</span>
                      </a>
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
