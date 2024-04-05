import Sidebar from '@/components/Sidebar'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getWorkspaces } from '@/prisma/services/workspace'

type AuthProps = {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthProps) {
  const organizationId: string = await useCurrentOrganization()

  const workspaces = await getWorkspaces(organizationId)

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <nav>
        <Sidebar workspaces={workspaces} />
      </nav>
      <main className="lg:pl-72">
        <Toaster />
        <div className="mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
}
