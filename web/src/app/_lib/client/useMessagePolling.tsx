'use client'
import useSWR from 'swr'

export default function useMessagePolling(run?: string, thread?: string) {
  const { data, error, isLoading } = useSWR(run ? `/api/ai/assist/${thread}/${run}` : null, {
    refreshInterval: 1000,
    revalidateOnFocus: false,
  })

  if (data) {
    const { status } = data

    return {
      response: data.text ?? '',
      status,
      isLoading: status === 'in_progress',
      isError: status != 'in_progress' && status != 'completed' ? error : false,
    }
  }

  return {
    response: '',
    status: '',
    isLoading: false,
    isError: false,
  }
}
