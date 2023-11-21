import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { classNames } from '@/utils/classnames'
import { Integration } from '@/lib/server/organizations'

export interface IntegrationCardProps {
  integration: Integration
}

const statuses = {
  offline: 'text-gray-500 bg-gray-100/10',
  online: 'text-green-400 bg-green-400/10',
  error: 'text-rose-400 bg-rose-400/10',
}
const environments = {
  Preview: 'text-gray-400 bg-gray-400/10 ring-gray-400/20',
  Production: 'text-indigo-400 bg-indigo-400/10 ring-indigo-400/30',
}

export default function IntegrationCard({
  integration: { status, href, brandName, integrationName, description, statusText, environment },
}: IntegrationCardProps) {
  return (
    <>
      <div className="min-w-0 flex-auto">
        <div className="flex items-center gap-x-3">
          <div
            className={classNames(
              statuses[status as keyof typeof statuses],
              'flex-none rounded-full p-1'
            )}
          >
            <div className="h-2 w-2 rounded-full bg-current" />
          </div>
          <h2 className="min-w-0 text-sm font-semibold leading-6 text-gray-800">
            <a href={href} className="flex gap-x-2">
              <span className="truncate">{brandName}</span>
              <span className="text-gray-400">/</span>
              <span className="whitespace-nowrap">{integrationName}</span>
              <span className="absolute inset-0" />
            </a>
          </h2>
        </div>
        <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
          <p className="truncate">{description}</p>
          <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
            <circle cx={1} cy={1} r={1} />
          </svg>
          <p className="whitespace-nowrap">{statusText}</p>
        </div>
      </div>
      <div
        className={classNames(
          environments[environment as keyof typeof environments],
          'rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset'
        )}
      >
        {environment}
      </div>
      <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
    </>
  )
}
