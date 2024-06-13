'use client'
import { SWRConfig } from 'swr'
import React from 'react'

interface SWRProviderProps {
  children: React.ReactNode
}

export const SWRProvider = ({ children }: SWRProviderProps) => {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  )
}
