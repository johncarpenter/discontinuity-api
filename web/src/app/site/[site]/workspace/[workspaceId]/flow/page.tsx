import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import Card from '@/components/Card'

import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import FlowsTable from '@/components/FlowsTable'
import { AddFlowDialog } from './addflowdialog'
import { getWorkspace } from '@/prisma/services/workspace'

type WorkspaceFlowTablePageProps = {
  params: {
    siteId: string
    workspaceId: string
  }
}

const WorkspaceFlowTablePage = async ({ params }: WorkspaceFlowTablePageProps) => {
  const organizationId = await useCurrentOrganization()
  const workspace = await getWorkspace(organizationId, params.workspaceId)

  return (
    <div className="">
      <Container>
        <PageHeader title="Models" breadcrumbs={[]} />

        <Card>
          <Card.Title
            title={'Your Custom Models, Agents and Workflows'}
            subtitle={'Link to all custom models, agents and workflows for the Workspace.'}
          >
            <Card.Action>
              <AddFlowDialog workspaceId={workspace.id} />
            </Card.Action>
          </Card.Title>
          <FlowsTable workspace={workspace} />
        </Card>
      </Container>
    </div>
  )
}

export default WorkspaceFlowTablePage
