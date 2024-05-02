import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import Card from '@/components/Card'

import Content from '@/components/Container'
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
      <Content>
        <PageHeader title="Models" breadcrumbs={[]} />
        <Content.Container>
          <Card>
            <Card.Title
              title={'Your custom models, agents and workflows'}
              subtitle={
                'Workflows are specific to your workspace and can be used to connect to external services, APIs, and databases.'
              }
            >
              <Card.Action>
                <AddFlowDialog workspaceId={workspace.id} />
              </Card.Action>
            </Card.Title>
            <FlowsTable workspace={workspace} />
          </Card>
        </Content.Container>
      </Content>
    </div>
  )
}

export default WorkspaceFlowTablePage
