import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getWorkspace } from '@/prisma/services/workspace'
import ChatPanel from '@/app/_components/ChatPanel'

type WorkspaceSearchPageProps = {
  params: {
    siteId: string
    workspaceId: string
  }
}

const WorkspaceSearchPage = async ({ params }: WorkspaceSearchPageProps) => {
  const { orgId } = await useCurrentOrganization()
  const workspace = await getWorkspace(orgId, params.workspaceId)
  return <ChatPanel workspace={workspace} />
}

export default WorkspaceSearchPage
