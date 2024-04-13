import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import Card from '@/components/Card'

import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { getWorkspace } from '@/prisma/services/workspace'
import ApiKeysTable from '@/components/ApiKeysTable'
import { AddApiKeyDialog } from './addapikeydialog'
import { Text } from '@/components/Base/text'

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
        <Card.Title title={'Workspace Settings'} />
        <div className="flex flex-row p-6">
          <div className="flex-1">
            <Text className="text-gray-800">Workspace Name</Text>
          </div>
          <div className="flex-shrink">
            <Text className="text-gray-500">{workspace.id}</Text>
          </div>
        </div>
      </Card>
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
