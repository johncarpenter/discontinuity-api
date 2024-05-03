/* eslint-disable @next/next/no-img-element */
import { DocumentIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import { Badge } from '@/components/Base/badge'
import { Button } from '@/components/Base/button'
import { useFocusFiles } from '@/lib/client/workspaceProvider'
import clsx from 'clsx'

export type FileCardProps = {
  snippet: string
  filename: string
  href: string
  type: string
  date: string
}

export default function FileCard({ snippet, filename, href, type, date }: FileCardProps) {
  const [focusFiles, setFocusFiles] = useFocusFiles()

  function isFocusFile(filename: string) {
    if (focusFiles === null) return false
    return focusFiles.includes(filename)
  }

  function toggleFocusFile(filename: string) {
    if (focusFiles === null) {
      setFocusFiles([filename])
      return
    }
    if (focusFiles.includes(filename)) {
      setFocusFiles(focusFiles.filter((file) => file !== filename))
    } else {
      setFocusFiles([...focusFiles, filename])
    }
  }

  const icon = (type: string) => {
    switch (type) {
      case 'pdf':
        return (
          <DocumentIcon className="h-10 w-10 flex-shrink-0 p-2 rounded-full bg-gray-300 dark:bg-gray-600 dark:border-gray-600 " />
        )
      case 'jpeg':
        return (
          <PhotoIcon className="h-10 w-10 flex-shrink-0 p-2rounded-full bg-gray-300 dark:bg-gray-600 dark:border-gray-600" />
        )
      case 'png':
        return (
          <PhotoIcon className="h-10 w-10 flex-shrink-0  p-2 rounded-full bg-gray-300 dark:bg-gray-600 dark:border-gray-600" />
        )
      default:
        return (
          <DocumentIcon className="h-10 w-10 flex-shrink-0 p-2 rounded-full bg-gray-300 dark:bg-gray-600 dark:border-gray-600" />
        )
    }
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-4">
        {type === 'jpg' || type === 'jpeg' || type === 'png' ? (
          <img src={href} className="size-40" alt={snippet} />
        ) : (
          <p className="text-sm text-gray-300">
            " {snippet.length > 30 ? `${snippet.substring(0, 30)}...` : snippet} "
          </p>
        )}
      </div>
      <div className="flex w-full  justify-between space-x-2 p-2">
        <div className="flex flex-col items-center flex-shrink-0">
          <a href={href}>
            {icon(type)}
            <div className="flex space-x-3">
              <Badge color="zinc" className="h-4 mt-1">
                {type}
              </Badge>
            </div>
          </a>
        </div>
        <div className="flex-1 truncate">
          <a href={href}>
            <p className="mt-1 truncate text-sm text-gray-300">{filename}</p>
            <p className="mt-1 truncate text-sm text-gray-500">{date}</p>
          </a>
        </div>
        <div className="flex flex-col items-center flex-shrink-0">
          <Button plain={true} onClick={() => toggleFocusFile(filename)}>
            <StarIcon
              className={clsx(
                'h-5 w-5',
                isFocusFile(filename) ? 'text-secondary-500' : 'text-lighter'
              )}
            />
          </Button>
        </div>
      </div>
    </div>
  )
}
