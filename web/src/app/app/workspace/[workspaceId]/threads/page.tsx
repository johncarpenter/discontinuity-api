import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { getWorkspace } from '@/prisma/services/workspace'
import ThreadsTable from '@/components/ThreadsTable'
import ThreadsEmptyState from './empty'
import Card from '@/components/Card'

type WorkspaceThreadsPageProps = {
  params: {
    siteId: string
    workspaceId: string
  }
}

const WorkspaceThreadsPage = async ({ params }: WorkspaceThreadsPageProps) => {
  const organization = await useCurrentOrganization()
  const workspace = await getWorkspace(organization.id, params.workspaceId)

  return (
    <Container>
      <PageHeader
        title={`Threads`}
        breadcrumbs={[{ href: '/app/workspaces', name: 'Workspaces' }]}
      />
      <Card>
        <Card.Title
          title={'Personal Threads'}
          subtitle={
            'Threads are a way to share chat sessions within a team. Your threads are private to your workspace.'
          }
        >
          <Card.Action></Card.Action>
        </Card.Title>
        {!workspace.threads ? <ThreadsEmptyState /> : <ThreadsTable workspace={workspace} />}
      </Card>
    </Container>
  )
}
export default WorkspaceThreadsPage
