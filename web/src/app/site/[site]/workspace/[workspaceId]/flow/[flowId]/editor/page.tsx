import useCurrentOrganization from '@/lib/client/useCurrentOrganization'

import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { getWorkspace } from '@/prisma/services/workspace'
import Iframe from 'react-iframe'
import { getFlowLink } from '@/prisma/services/flow'

type WorkspaceFlowPageProps = {
  params: {
    siteId: string
    workspaceId: string
    flowId: string
  }
}

const WorkflowNoCode = async ({ params }: WorkspaceFlowPageProps) => {
  const organizationId = await useCurrentOrganization()
  const workspace = await getWorkspace(organizationId, params.workspaceId)
  const flow = await getFlowLink(params.flowId, workspace.id)

  let flowlink = 'https://flow.discontinuity.ai/'

  if (flow.endpoint.indexOf('flow.discontinuity.ai') !== -1) {
    const flowiseId = flow.endpoint.split('/').pop()
    flowlink += `canvas/${flowiseId}`
  }

  return (
    <div className="">
      <Container>
        <PageHeader
          title="Workflow Editor"
          breadcrumbs={[{ href: `/workspace/${workspace.slug}/flow`, name: 'Models' }]}
        />
        <div className="flex min-h-screen">
          <Iframe
            url={flowlink}
            id=""
            className="w-full h-full flex-1 min-h-[85vh] border-none"
            display="block"
            position="relative"
          />
        </div>
      </Container>
    </div>
  )
}

export default WorkflowNoCode
