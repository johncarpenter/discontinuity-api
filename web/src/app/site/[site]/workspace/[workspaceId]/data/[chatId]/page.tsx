import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getWorkspace } from '@/prisma/services/workspace'
import DataChatPanel from '@/app/_components/DataChatPanel'

type WorkspaceDataSinglePageProps = {
  params: {
    siteId: string
    workspaceId: string
    chatId: string
  }
}

const WorkspaceDataSinglePage = async ({ params }: WorkspaceDataSinglePageProps) => {
  const { orgId } = await useCurrentOrganization()
  const workspace = await getWorkspace(orgId, params.workspaceId)
  return <DataChatPanel workspace={workspace} chatId={params.chatId} />
}

export default WorkspaceDataSinglePage
