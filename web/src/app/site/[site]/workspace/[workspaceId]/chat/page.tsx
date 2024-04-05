import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import Card from '@/components/Card'

import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { getWorkspace } from '@/prisma/services/workspace'

type WorkspaceSettingsPageProps = {
  params: {
    siteId: string
    workspaceId: string
  }
}

const WorkspaceChatPage = async ({ params }: WorkspaceSettingsPageProps) => {
  const organizationId = await useCurrentOrganization()
  const workspace = await getWorkspace(organizationId, params.workspaceId)

  return (
    <Container>
      <PageHeader
        title={`${workspace.name} Settings`}
        breadcrumbs={[{ href: '/workspaces', name: 'Workspaces' }]}
      />
      <Card>
        <Card.Title title={'Interactive'}>
          <Card.Action></Card.Action>
        </Card.Title>
      </Card>
    </Container>
  )
}
export default WorkspaceChatPage
