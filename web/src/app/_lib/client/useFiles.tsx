'use client'

import useSWR from 'swr'

interface File {
  Key: string
  LastModified: string
}

type useFilesProps = {
  workspaceId: string
  fileTypeFilter?: string[]
}

export default function useFiles({ workspaceId, fileTypeFilter }: useFilesProps) {
  const { data, error, isLoading } = useSWR<File[]>(`/api/workspace/${workspaceId}/files`)

  const files = data?.filter((file) => file.Key?.endsWith('/') === false) as File[]

  if (fileTypeFilter) {
    return {
      files: files?.filter((file) => fileTypeFilter.includes(file.Key.split('.').pop() as string)),
      isLoading,
      isError: error,
    }
  }

  return {
    files: files,
    isLoading,
    isError: error,
  }
}
