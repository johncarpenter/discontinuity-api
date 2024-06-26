import { Text } from '@/components/Base/text'
import { AddWorkspaceDialog } from '@/components/Dialogs/addworkspacedialog'

export default function HomeEmptyState() {
  return (
    <div className="text-center border border-dashed border-gray-600 py-20 px-40 rounded-md min-w-60">
      <h3 className="mt-2 text-lg font-semibold text-normal">No Workspaces</h3>
      <Text>A workspace is a collection of models and data. Think of it like a folder</Text>
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>

      <p className="mt-1 text-sm text-gray-500">Get started by creating a new workspace.</p>
      <div className="mt-6">
        <AddWorkspaceDialog />
      </div>
    </div>
  )
}
