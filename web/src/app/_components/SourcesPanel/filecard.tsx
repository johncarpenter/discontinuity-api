import { DocumentIcon, DocumentTextIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { Badge } from '@/components/Base/badge'
import Image from 'next/image'

export type FileCardProps = {
  snippet: string
  filename: string
  href: string
  type: string
}
export default function FileCard({ snippet, filename, href, type }: FileCardProps) {
  const icon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <DocumentIcon className="h-10 w-10 flex-shrink-0 p-2 rounded-full bg-gray-300" />
      case 'jpeg':
        return <PhotoIcon className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" />
      case 'png':
        return <PhotoIcon className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" />
      case 'text/plain':
        return <DocumentTextIcon className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" />
      default:
        return <DocumentIcon className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" />
    }
  }
  return (
    <div className="flex flex-col">
      <div className="flex w-full  justify-between space-x-2 p-2">
        <div className="flex-1 truncate">
          <div className="flex space-x-3">
            {type === 'png' ? (
              <Image src={href} width={40} height={40} alt="pdf" />
            ) : (
              <h3 className="truncate text-sm font-medium text-gray-900">
                {snippet?.substring(0, 30)}
              </h3>
            )}

            <Badge color="secondary" className="h-4">
              {type}
            </Badge>
          </div>
          <p className="mt-1 truncate text-sm text-gray-500">{filename}</p>
        </div>
        {icon(type)}
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <a
              href={href}
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <DocumentTextIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              View
            </a>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <a
              href={`tel:12`}
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <DocumentTextIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              Search
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
