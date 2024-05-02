/* eslint-disable @next/next/no-img-element */
import { DocumentIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { Badge } from '@/components/Base/badge'

export type FileCardProps = {
  snippet: string
  filename: string
  href: string
  type: string
  date: string
}

export default function FileCard({ snippet, filename, href, type, date }: FileCardProps) {
  const icon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <DocumentIcon className="h-10 w-10 flex-shrink-0 p-2 rounded-full bg-gray-300" />
      case 'jpeg':
        return <PhotoIcon className="h-10 w-10 flex-shrink-0 p-2rounded-full bg-gray-300" />
      case 'png':
        return <PhotoIcon className="h-10 w-10 flex-shrink-0  p-2 rounded-full bg-gray-300" />
      default:
        return <DocumentIcon className="h-10 w-10 flex-shrink-0 p-2 rounded-full bg-gray-300" />
    }
  }
  return (
    <a href={href}>
      <div className="flex flex-col items-center justify-center">
        <div className="p-4">
          {type === 'jpg' || type === 'jpeg' || type === 'png' ? (
            <img src={href} className="size-40" alt={snippet} />
          ) : (
            <p className="text-sm text-gray-700">
              " {snippet.length > 30 ? `${snippet.substring(0, 30)}...` : snippet} "
            </p>
          )}
        </div>
        <div className="flex w-full  justify-between space-x-2 p-2">
          <div className="flex flex-col items-center flex-shrink-0">
            {icon(type)}
            <div className="flex space-x-3">
              <Badge color="secondary" className="h-4">
                {type}
              </Badge>
            </div>
          </div>
          <div className="flex-1 truncate">
            <p className="mt-1 truncate text-sm text-gray-700">{filename}</p>
            <p className="mt-1 truncate text-sm text-gray-500">{date}</p>
          </div>
        </div>
      </div>
    </a>
  )
}
