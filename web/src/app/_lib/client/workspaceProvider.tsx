'use client'
import { workspaces } from '@prisma/client'
import { useContext, useState } from 'react'

import { createContext } from 'react'

type WorkSpaceContextType = {
  workspace: workspaces | null
  setWorkspace: React.Dispatch<React.SetStateAction<workspaces | null>>
}

const WorkSpaceContext = createContext<WorkSpaceContextType | null>(null)

type WorkSpaceContextProps = {
  children: React.ReactNode
}

export const WorkspaceProvider = ({ children }: WorkSpaceContextProps) => {
  const [workspace, setWorkspace] = useState<workspaces | null>(null)

  return (
    <WorkSpaceContext.Provider value={{ workspace, setWorkspace }}>
      {children}
    </WorkSpaceContext.Provider>
  )
}

export const useWorkspace = () => {
  const context = useContext(WorkSpaceContext)
  if (context === undefined || context === null) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider')
  }
  return [context.workspace, context.setWorkspace] as const
}
