'use client'
import { llmmodels, organizations, prompts, users } from '@prisma/client'
import { useContext, useState } from 'react'

import { createContext } from 'react'

type OrganizationContextType = {
  user: users | null
  organization: (organizations & { prompts: prompts[]; llmmodels: llmmodels[] }) | null
  setOrganization: React.Dispatch<
    React.SetStateAction<organizations & { prompts: prompts[]; llmmodels: llmmodels[] }>
  >
  setUser: React.Dispatch<React.SetStateAction<users | null>>
}

const OrganizationContext = createContext<OrganizationContextType | null>(null)

type OrganizationContextProps = {
  children: React.ReactNode
  org: organizations & { prompts: prompts[]; llmmodels: llmmodels[] }
}

export const OrganizationProvider = ({ children, org }: OrganizationContextProps) => {
  const [organization, setOrganization] = useState<
    organizations & { prompts: prompts[]; llmmodels: llmmodels[] }
  >(org)
  const [user, setUser] = useState<users | null>(null)

  return (
    <OrganizationContext.Provider value={{ organization, setOrganization, user, setUser }}>
      {children}
    </OrganizationContext.Provider>
  )
}

export const useOrganization = () => {
  const context = useContext(OrganizationContext)
  if (context === undefined || context === null) {
    throw new Error('useOrganization must be used within a OrganizationProvider')
  }
  return [context.organization, context.setOrganization] as const
}

export const useOrganizationUser = () => {
  const context = useContext(OrganizationContext)
  if (context === undefined || context === null) {
    throw new Error('useOrganizationUser must be used within a organizationProvider')
  }
  return [context.user, context.setUser] as const
}
