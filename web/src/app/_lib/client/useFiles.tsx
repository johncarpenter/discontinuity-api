'use client'

import useSWR from 'swr'

interface File {
  Key: string
  LastModified: string
}

export default function useFiles() {
  const { data, error, isLoading } = useSWR<File[]>(`/api/files`)

  const files = data?.filter((file) => file.Key?.endsWith('/') === false) as File[]

  return {
    files: files,
    isLoading,
    isError: error,
  }
}
