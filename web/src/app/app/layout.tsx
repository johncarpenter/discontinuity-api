import Sidebar from '@/components/Sidebar'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getWorkspaces } from '@/prisma/services/workspace'
import { WorkspaceProvider } from '@/lib/client/workspaceProvider'
import { OrganizationProvider } from '../_lib/client/organizationProvider'
import { auth, currentUser } from '@clerk/nextjs/server'
import { LicenseType } from '@prisma/client'
import { addPromptToOrganization, createOrganization } from '@/prisma/services/organization'
import { createUser } from '@/prisma/services/user'

async function createDefaultOrganization(
  user: any,
  name: string,
  license: string,
  userId?: string,
  orgId?: string
) {
  console.log('Creating default organization', userId, orgId, name, license)
  const org = await createOrganization(userId, orgId, name, license)
  console.log('Created organization', org)

  await addPromptToOrganization(org.id, user.id, {
    name: 'Default Prompt',
    prompt: 'You are a helpful assistant',
    isPrivate: false,
  })

  return org
}

type AuthProps = {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthProps) {
  let organization = await useCurrentOrganization()

  if (!organization) {
    const { userId, orgId } = auth()
    const authUser = await currentUser()

    // Create a new organization for the user
    const user = await createUser(userId, authUser?.fullName, authUser?.imageUrl)
    organization = await createDefaultOrganization(
      user,
      'Default Organization',
      orgId ? LicenseType.TEAM : LicenseType.SOLO,
      userId || undefined,
      orgId || undefined
    )
  }

  const workspaces = await getWorkspaces(organization.id)

  return (
    <WorkspaceProvider>
      <OrganizationProvider org={organization}>
        <div className="dark dark:[color-scheme:dark] dark:prose-dark">
          <div className="flex flex-col min-h-screen bg-slate-50  dark:bg-gray-800">
            <>
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
                <div>{children}</div>
              </main>
            </>
          </div>
        </div>
      </OrganizationProvider>
    </WorkspaceProvider>
  )
}
