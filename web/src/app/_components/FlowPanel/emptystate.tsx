'use client'
//import { Text } from '@/components/Base/text'
import { flows } from '@prisma/client'

export default function FlowEmptyState({ flow }: { flow: flows }) {
  return (
    <>
      <div className="flex flex-col text-center">
        <h4 className="text-2xl font-bold mb-2 text-gray-700 dark:text-gray-50">{flow.name}</h4>
        <p className="text-gray-600 dark:text-gray-300 mb-2">{flow.description}</p>

        {/* <div className="mx-auto grid max-w-3xl grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="border border-dashed border-gray-600 p-4 rounded-md w-60">
            <Text>Sumamrize Documents</Text>
          </div>
          <div className="border border-dashed border-gray-600 p-4 rounded-md w-60">
            <Text>Research concepts across PDFs</Text>
          </div>
        </div> */}
      </div>
    </>
  )
}
