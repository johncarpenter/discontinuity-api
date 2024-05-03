import Sidebar from '@/components/Sidebar'
import React, { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getWorkspaces } from '@/prisma/services/workspace'
import { WorkspaceProvider } from '@/app/_lib/client/workspaceProvider'
import Loading from './loading'

type AuthProps = {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthProps) {
  const organizationId: string = await useCurrentOrganization()

  const workspaces = await getWorkspaces(organizationId)

  return (
    <WorkspaceProvider>
      <div className="dark dark:[color-scheme:dark] dark:prose-dark">
        <div className="flex flex-col min-h-screen bg-slate-50  dark:bg-gray-800">
          <nav>
            <Sidebar workspaces={workspaces} />
          </nav>
          <main className="lg:pl-72">
            <Toaster
              position="top-right"
              toastOptions={{
                style: { minWidth: '450px', background: '#121212', color: '#ffffff' },
              }}
            />
            <div>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
          </main>
        </div>
      </div>
    </WorkspaceProvider>
  )
}
