'use client'
import { Text } from '@/components/Base/text'
import { Badge } from '../Base/badge'

export default function ChatEmptyState() {
  return (
    <>
      <div className="flex flex-col text-center">
        <h4 className="text-2xl font-bold mb-2 text-gray-700 dark:text-gray-50">
          Connect with Multiple Foundation Models.
        </h4>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Without the cost, complexity, and inflexibility of traditional AI solutions.
        </p>

        <div className="mx-auto grid max-w-3xl grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="border border-dashed border-gray-600 p-4 rounded-md w-60">
            <Text>
              Web Searches <Badge color="blue">Pro</Badge>
            </Text>
          </div>
          <div className="border border-dashed border-gray-600 p-4 rounded-md w-60">
            <Text>Toggle Foundation Models</Text>
          </div>
        </div>
      </div>
    </>
  )
}
