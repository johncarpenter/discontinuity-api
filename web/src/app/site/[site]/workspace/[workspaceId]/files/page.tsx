import Card from '@/components/Card'
import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getWorkspace } from '@/prisma/services/workspace'
import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import FilesTable from '@/app/_components/FilesTable'
import { UploadDialog } from './uploaddialog'

type WorkspaceSettingsPageProps = {
  params: {
    siteId: string
    workspaceId: string
  }
}

const FilesListPage = async ({ params }: WorkspaceSettingsPageProps) => {
  const { orgId } = await useCurrentOrganization()
  const workspace = await getWorkspace(orgId, params.workspaceId)

  return (
    <Container>
      <PageHeader title={` Files`} breadcrumbs={[{ href: '/workspaces', name: 'Workspaces' }]} />
      <Card>
        <Card.Title title={'Files'}>
          <Card.Action>
            <UploadDialog workspaceId={workspace.id} />
          </Card.Action>
        </Card.Title>
        <FilesTable workspaceId={workspace.id} />
      </Card>
    </Container>
  )
}
export default FilesListPage
