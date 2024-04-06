import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getWorkspace } from '@/prisma/services/workspace'
import ChatPanel from '@/app/_components/ChatPanel'

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
    <div className="">
      <ChatPanel workspaceId={workspace.id} />
    </div>
  )
}
export default WorkspaceChatPage
