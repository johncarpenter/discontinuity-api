import { DocumentIcon, DocumentTextIcon, PhotoIcon } from '@heroicons/react/24/outline'

export type FileCardProps = {
  snippet: string
  filename: string
  href: string
  type: string
}

export default function FileCard({ snippet, filename, href, type }: FileCardProps) {
  const icon = (type: string) => {
    switch (type) {
      case 'application/pdf':
        return <DocumentIcon className="h-24 w-24 text-gray-400" />
      case 'image/jpeg':
        return <PhotoIcon className="h-24 w-24 text-gray-400" />
      case 'image/png':
        return <PhotoIcon className="h-24 w-24 text-gray-400" />
      case 'text/plain':
        return <DocumentTextIcon className="h-24 w-24 text-gray-400" />
      default:
        return <DocumentIcon className="h-24 w-24 text-gray-400" />
    }
  }

  return (
    <a href={href}>
      <div className="bg-white px-6 py-6 lg:px-8 overflow-hidden rounded-2xl shadow-xl hover:ring-1 hover:ring-secondary-500 ">
        <div className="col-span-1 flex ">
          <div className="flex items-center justify-center w-16 h-16 rounded-lg">{icon(type)}</div>

          <div className="flex flex-1 items-center justify-between">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                {`${snippet.substring(0, 30)}...`}
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500"></div>
              <a href={href} className="text-sm text-secondary-600 hover:underline">
                <div className="mt-3 text-sm leading-6 font-semibold text-secondary-600 flex flex-row">
                  <p>{filename}</p>
                  <span aria-hidden="true"> &rarr;</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}
