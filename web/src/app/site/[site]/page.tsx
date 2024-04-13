import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import SimpleCard from '@/components/SimpleCard'
import { getWorkspaces } from '@/prisma/services/workspace'
import { workspaces } from '@prisma/client'

export default async function SiteHome() {
  const organizationId = await useCurrentOrganization()

  const workspaces = await getWorkspaces(organizationId)

  return (
    <>
      <Container>
        <PageHeader title={`Your Workspaces`} breadcrumbs={[]} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
          {workspaces.map((workspace: workspaces) => (
            <SimpleCard
              key={workspace.id}
              title={workspace.name}
              subtitle={'Workspace Description'}
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
