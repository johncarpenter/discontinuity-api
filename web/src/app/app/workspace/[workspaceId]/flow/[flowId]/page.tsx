import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getWorkspace } from '@/prisma/services/workspace'
import FlowPanel from '@/app/_components/FlowPanel'
import { getFlowLink } from '@/prisma/services/flow'

type WorkspaceFlowPageProps = {
  params: {
    siteId: string
    workspaceId: string
    flowId: string
  }
}

const WorkspaceFlowPage = async ({ params }: WorkspaceFlowPageProps) => {
  const organization = await useCurrentOrganization()
  const workspace = await getWorkspace(organization.id, params.workspaceId)
  const flow = await getFlowLink(params.flowId, workspace.id)

  return (
    <div className="">
      <FlowPanel workspace={workspace} flow={flow} />
    </div>
  )
}

export default WorkspaceFlowPage
