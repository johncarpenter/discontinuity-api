import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getWorkspace } from '@/prisma/services/workspace'
import DataChatPanel from '@/app/_components/DataChatPanel'

type WorkspaceDataPageProps = {
  params: {
    siteId: string
    workspaceId: string
  }
}

const WorkspaceDataPage = async ({ params }: WorkspaceDataPageProps) => {
  const { id } = await useCurrentOrganization()
  const workspace = await getWorkspace(id, params.workspaceId)
  return <DataChatPanel workspace={workspace} />
}

export default WorkspaceDataPage
