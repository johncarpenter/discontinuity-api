import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import Card from '@/components/Card'

import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { getWorkspace } from '@/prisma/services/workspace'
import ApiKeysTable from '@/app/_components/ApiKeysTable'
import { AddApiKeyDialog } from './addapikeydialog'

type WorkspaceSettingsPageProps = {
  params: {
    siteId: string
    workspaceId: string
  }
}

const WorkspaceSettingsPage = async ({ params }: WorkspaceSettingsPageProps) => {
  const organizationId = await useCurrentOrganization()
  const workspace = await getWorkspace(organizationId, params.workspaceId)

  return (
    <Container>
      <PageHeader
        title={`${workspace.name} Settings`}
        breadcrumbs={[{ href: '/workspaces', name: 'Workspaces' }]}
      />
      <Card>
        <Card.Title title={'API Keys'}>
          <Card.Action>
            <AddApiKeyDialog workspaceId={workspace.id} />
          </Card.Action>
        </Card.Title>
        <ApiKeysTable workspaceId={workspace.id} />
      </Card>
    </Container>
  )
}
export default WorkspaceSettingsPage
