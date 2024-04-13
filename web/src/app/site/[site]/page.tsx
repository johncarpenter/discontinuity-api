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
        {workspaces.map((workspace: workspaces) => (
          <SimpleCard
            key={workspace.id}
            title={workspace.name}
            subtitle={''}
            cta={'Discover Files'}
            href={`/workspaces/${workspace.slug}/chat`}
            src={''}
            alt={''}
          />
        ))}
      </Container>
    </>
  )
}
