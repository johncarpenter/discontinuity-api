import useCurrentOrganization from '@/lib/client/useCurrentOrganization'

import { getWorkspace } from '@/prisma/services/workspace'
import { getFlowLink } from '@/prisma/services/flow'
import jwt from 'jsonwebtoken'
import SecureIFrame from '@/components/SecureIframe'

type WorkspaceFlowPageProps = {
  params: {
    siteId: string
    workspaceId: string
    flowId: string
  }
}

const WorkflowNoCode = async ({ params }: WorkspaceFlowPageProps) => {
  const organization = await useCurrentOrganization()
  const workspace = await getWorkspace(organization.id, params.workspaceId)
  const flow = await getFlowLink(params.flowId, workspace.id)

  let flowlink = organization.flow_endpoint

  if (flow.endpoint.indexOf(flowlink) !== -1) {
    const flowiseId = flow.endpoint.split('/').pop()
    flowlink += `canvas/${flowiseId}`
  }

  const token = jwt.sign({ orgId: organization.id }, process.env.JWT_SECRET ?? '', {
    expiresIn: '1h',
  })

  return (
    <div className="mt-18">
      <SecureIFrame token={token} url={flowlink} />
    </div>
  )
}

export default WorkflowNoCode
