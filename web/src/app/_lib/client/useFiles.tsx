'use client'

import { files } from '@prisma/client'
import useSWR from 'swr'

type useFilesProps = {
  workspaceId: string
  fileTypeFilter?: string[]
}

export default function useFiles({ workspaceId, fileTypeFilter }: useFilesProps) {
  const { data, error, isLoading } = useSWR<files[]>(
    `/api/workspace/${workspaceId}/files`,
    (resource, init) => fetch(resource, init).then((res) => res.json()),
    { refreshInterval: 1000 }
  )

  if (fileTypeFilter) {
    return {
      files: data?.filter((file) =>
        fileTypeFilter.includes(file.filename.split('.').pop() as string)
      ),
      isLoading,
      isError: error,
    }
  }

  return {
    files: data,
    isLoading,
    isError: error,
  }
}
