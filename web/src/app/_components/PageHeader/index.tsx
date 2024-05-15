import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

export default function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
  return (
    <div>
      <div>
        <nav className="sm:hidden" aria-label="Back">
          <Link
            key="0"
            href="/app"
            className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ChevronLeftIcon
              className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            Home
          </Link>
        </nav>
        <nav className="hidden sm:flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <div className="flex">
                <Link
                  key="0"
                  href="/app"
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Home
                </Link>
                <ChevronRightIcon
                  className="h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </li>

            {breadcrumbs.map((breadcrumb, i) => (
              <li key={i}>
                <div className="flex items-center">
                  <Link
                    href={breadcrumb.href}
                    className=" text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    {breadcrumb.name}
                  </Link>
                  <ChevronRightIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
      <div className="mt-2 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-gray-50 sm:truncate sm:text-3xl sm:tracking-tight">
            {title}
          </h2>
        </div>
      </div>
    </div>
  )
}

export interface Breadcrumb {
  name: string
  href: string
}
interface PageHeaderProps {
  title: string
  breadcrumbs: Breadcrumb[]
}
