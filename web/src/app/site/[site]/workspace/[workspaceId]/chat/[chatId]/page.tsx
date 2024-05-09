import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getWorkspace } from '@/prisma/services/workspace'
import ChatPanel from '@/app/_components/ChatPanel'

type WorkspaceChatSinglePageProps = {
  params: {
    siteId: string
    workspaceId: string
    chatId: string
  }
}

const WorkspaceChatSinglePage = async ({ params }: WorkspaceChatSinglePageProps) => {
  const { orgId } = await useCurrentOrganization()
  const workspace = await getWorkspace(orgId, params.workspaceId)
  return <ChatPanel workspace={workspace} chatId={params.chatId} />
}

export default WorkspaceChatSinglePage
