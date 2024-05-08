import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { getWorkspace } from '@/prisma/services/workspace'
import { getThreads } from '@/prisma/services/threads'
import { threads } from '@prisma/client'

type WorkspaceThreadsPageProps = {
  params: {
    siteId: string
    workspaceId: string
  }
}

const WorkspaceThreadsPage = async ({ params }: WorkspaceThreadsPageProps) => {
  const organizationId = await useCurrentOrganization()
  const workspace = await getWorkspace(organizationId, params.workspaceId)
  const threads = await getThreads(workspace.id, organizationId)

  return (
    <Container>
      <PageHeader title={`Threads`} breadcrumbs={[{ href: '/workspaces', name: 'Workspaces' }]} />
      {threads.map((thread: threads) => (
        <div key={thread.id}>
          {thread.link}- {thread.name}
        </div>
      ))}
    </Container>
  )
}
export default WorkspaceThreadsPage
