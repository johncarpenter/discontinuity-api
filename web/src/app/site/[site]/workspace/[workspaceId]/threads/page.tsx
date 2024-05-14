import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { getWorkspace } from '@/prisma/services/workspace'
import ThreadsTable from '@/app/_components/ThreadsTable'
import ThreadsEmptyState from './empty'

type WorkspaceThreadsPageProps = {
  params: {
    siteId: string
    workspaceId: string
  }
}

const WorkspaceThreadsPage = async ({ params }: WorkspaceThreadsPageProps) => {
  const { orgId } = await useCurrentOrganization()
  const workspace = await getWorkspace(orgId, params.workspaceId)

  return (
    <Container>
      <PageHeader title={`Threads`} breadcrumbs={[{ href: '/workspaces', name: 'Workspaces' }]} />
      {!workspace.threads ? <ThreadsEmptyState /> : <ThreadsTable workspace={workspace} />}
    </Container>
  )
}
export default WorkspaceThreadsPage
