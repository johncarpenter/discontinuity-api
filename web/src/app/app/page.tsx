import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import SimpleCard from '@/components/SimpleCard'
import { getWorkspaces } from '@/prisma/services/workspace'
import { workspaces } from '@prisma/client'
import useCurrentUser from '@/app/_lib/client/useCurrentUser'
import { Onboarding } from '@/app/_components/Onboarding'
import useCurrentOrganization from '../_lib/client/useCurrentOrganization'

export default async function SiteHome() {
  const organization = await useCurrentOrganization()
  const user = await useCurrentUser()
  const workspaces = await getWorkspaces(organization.id)
  const needsOnboarding = organization.llmmodels.length === 0 || workspaces.length === 0


  
  return (
    <>
      <Container>
        <PageHeader title={`Welcome, ${user?.fullName}`} breadcrumbs={[]} />
        {needsOnboarding && (
          <div className="flex h-[75vh]">
            <div className="p-4 m-auto">
              <Onboarding />
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
          {workspaces.map((workspace: workspaces) => (
            <SimpleCard
              key={workspace.id}
              title={workspace.name + (workspace.isPrivate ? ' (Private)' : '')}
              subtitle={workspace.description ?? ''}
              cta={'Go to Discover'}
              href={`/workspace/${workspace.slug}/chat`}
              src={'/images/course_1.png'}
              alt={''}
            />
          ))}
        </div>
      </Container>
    </>
  )
}
