import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { getWorkspace } from '@/prisma/services/workspace'
import ThreadsTable from '@/app/_components/ThreadsTable'

type WorkspaceThreadsPageProps = {
  params: {
    siteId: string
    workspaceId: string
  }
}

const WorkspaceThreadsPage = async ({ params }: WorkspaceThreadsPageProps) => {
  const organizationId = await useCurrentOrganization()
  const workspace = await getWorkspace(organizationId, params.workspaceId)

  return (
    <Container>
      <PageHeader title={`Threads`} breadcrumbs={[{ href: '/workspaces', name: 'Workspaces' }]} />
      <ThreadsTable workspace={workspace} />
    </Container>
  )
}
export default WorkspaceThreadsPage
