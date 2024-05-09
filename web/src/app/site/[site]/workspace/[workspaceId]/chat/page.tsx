import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getWorkspace } from '@/prisma/services/workspace'
import ChatPlusPanel from '@/app/_components/ChatPlusPanel'

type WorkspaceSettingsPageProps = {
  params: {
    siteId: string
    workspaceId: string
  }
}

const WorkspaceChatPage = async ({ params }: WorkspaceSettingsPageProps) => {
  const { orgId } = await useCurrentOrganization()
  const workspace = await getWorkspace(orgId, params.workspaceId)
  return <ChatPlusPanel workspace={workspace} />
}

export default WorkspaceChatPage
