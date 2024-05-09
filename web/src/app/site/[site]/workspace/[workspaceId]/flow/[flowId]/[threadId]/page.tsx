import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getWorkspace } from '@/prisma/services/workspace'
import FlowPanel from '@/app/_components/FlowPanel'
import { getFlowLink } from '@/prisma/services/flow'

type WorkspaceFlowThreadPageProps = {
  params: {
    siteId: string
    workspaceId: string
    flowId: string
    threadId: string
  }
}

const WorkspaceFlowThreadPage = async ({ params }: WorkspaceFlowThreadPageProps) => {
  const { orgId } = await useCurrentOrganization()
  const workspace = await getWorkspace(orgId, params.workspaceId)
  const flow = await getFlowLink(params.flowId, workspace.id)

  return (
    <div className="">
      <FlowPanel workspace={workspace} flow={flow} chatId={params.threadId} />
    </div>
  )
}

export default WorkspaceFlowThreadPage
