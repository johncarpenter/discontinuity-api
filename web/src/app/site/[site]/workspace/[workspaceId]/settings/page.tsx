import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import Card from '@/components/Card'

import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { getWorkspace } from '@/prisma/services/workspace'
import ApiKeysTable from '@/components/ApiKeysTable'
import { AddApiKeyDialog } from './addapikeydialog'
import { Text } from '@/components/Base/text'
import { CopyToClipboard } from '@/app/_components/CopyToClipboard'
import { ClipboardIcon } from '@heroicons/react/24/outline'

type WorkspaceSettingsPageProps = {
  params: {
    siteId: string
    workspaceId: string
  }
}

const WorkspaceSettingsPage = async ({ params }: WorkspaceSettingsPageProps) => {
  const { orgId } = await useCurrentOrganization()
  const workspace = await getWorkspace(orgId, params.workspaceId)

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
          <div className="flex-shrink flex">
            <Text className="text-gray-500">{workspace.id}</Text>
            <CopyToClipboard copyText={workspace.id}>
              <ClipboardIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </CopyToClipboard>
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
