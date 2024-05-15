import Card from '@/components/Card'
import WorkspacesTable from '@/components/WorkspacesTable'

import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { AddWorkspaceDialog } from '@/components/Dialogs/addworkspacedialog'

const WorkspacesPage = async () => {
  return (
    <Container>
      <PageHeader title="Manage your Workspaces" breadcrumbs={[]} />

      <Card>
        <Card.Title
          title={'Your Workspaces'}
          subtitle={
            'A workspace is a collection of AI models, data, and other resources that you can use to build and deploy machine learning applications.'
          }
        >
          <Card.Action>
            <AddWorkspaceDialog />
          </Card.Action>
        </Card.Title>
        <WorkspacesTable />
      </Card>
    </Container>
  )
}
export default WorkspacesPage
