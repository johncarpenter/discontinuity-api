'use client'
import { workspaces } from '@prisma/client'
import { useContext, useState } from 'react'

import { createContext } from 'react'

type WorkSpaceContextType = {
  focusFiles: string[] | null
  workspace: workspaces | null
  setWorkspace: React.Dispatch<React.SetStateAction<workspaces | null>>
  setFocusFiles: React.Dispatch<React.SetStateAction<string[] | null>>
}

const WorkSpaceContext = createContext<WorkSpaceContextType | null>(null)

type WorkSpaceContextProps = {
  children: React.ReactNode
}

export const WorkspaceProvider = ({ children }: WorkSpaceContextProps) => {
  const [workspace, setWorkspace] = useState<workspaces | null>(null)
  const [focusFiles, setFocusFiles] = useState<string[] | null>(null)

  return (
    <WorkSpaceContext.Provider value={{ workspace, setWorkspace, focusFiles, setFocusFiles }}>
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

export const useFocusFiles = () => {
  const context = useContext(WorkSpaceContext)
  if (context === undefined || context === null) {
    throw new Error('useFocusFiles must be used within a WorkspaceProvider')
  }
  return [context.focusFiles, context.setFocusFiles] as const
}
