import Sidebar from '@/components/Sidebar'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getWorkspaces } from '@/prisma/services/workspace'
import { WorkspaceProvider } from '@/lib/client/workspaceProvider'
import { OrganizationProvider } from '../_lib/client/organizationProvider'
import Loading from './loading'
import { ChatProvider } from '../_lib/client/chatProvider'

type AuthProps = {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthProps) {
  const organization = await useCurrentOrganization()
  const workspaces = await getWorkspaces(organization?.id)

  return (
    <>
      {organization === null ? (
        <>
          <Loading />
        </>
      ) : (
        <WorkspaceProvider>
          <OrganizationProvider org={organization}>
            <ChatProvider
              link={''}
              modelId={organization.llmmodels[0].id}
              promptId={organization.prompts[0].id}
            >
              <div className="dark dark:[color-scheme:dark] dark:prose-dark">
                <div className="flex flex-col min-h-screen bg-slate-50  dark:bg-gray-800">
                  <>
                    <header className="sticky top-0 z-50 ">
                      <Sidebar workspaces={workspaces} />
                    </header>
                    <main className="lg:pl-8 relative">
                      <Toaster
                        position="top-right"
                        toastOptions={{
                          style: { minWidth: '450px', background: '#121212', color: '#ffffff' },
                        }}
                      />
                      <div>{children}</div>
                    </main>
                  </>
                </div>
              </div>
            </ChatProvider>
          </OrganizationProvider>
        </WorkspaceProvider>
      )}
    </>
  )
}
