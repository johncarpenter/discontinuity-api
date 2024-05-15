'use client'
import { Text } from '@/components/Base/text'

export default function ChatEmptyState() {
  return (
    <>
      <div className="flex flex-col text-center">
        <h4 className="text-2xl font-bold mb-2 text-gray-700 dark:text-gray-50">
          Your files are now searchable.
        </h4>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Look through documents, images and audio transcriptions to aggregate answers from multiple
          sources.
        </p>

        <div className="mx-auto grid max-w-3xl grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="border border-dashed border-gray-600 p-4 rounded-md w-60">
            <Text>Add a file using "Add Files" below</Text>
          </div>
          <div className="border border-dashed border-gray-600 p-4 rounded-md w-60">
            <Text>Select "Focus Files" to narrow your search to only specific files</Text>
          </div>
        </div>
      </div>
    </>
  )
}
