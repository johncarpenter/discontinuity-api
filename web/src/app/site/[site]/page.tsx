import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import SimpleCard from '@/components/SimpleCard'
import { getWorkspaces } from '@/prisma/services/workspace'
import { workspaces } from '@prisma/client'
import HomeEmptyState from './empty'
import useCurrentUser from '@/app/_lib/client/useCurrentUser'

export default async function SiteHome() {
  const { orgId } = await useCurrentOrganization()
  const user = await useCurrentUser()

  const workspaces = await getWorkspaces(orgId)

  return (
    <>
      <Container>
        <PageHeader title={`Welcome, ${user?.fullName}`} breadcrumbs={[]} />
        {workspaces.length === 0 && (
          <div className="flex h-[75vh]">
            <div className="p-4 m-auto">
              <HomeEmptyState />
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
