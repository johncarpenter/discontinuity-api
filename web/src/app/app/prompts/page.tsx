import Card from '@/components/Card'

import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { AddPromptDialog } from '@/app/_components/Dialogs/addpromptdialog'
import PromptsTable from '@/app/_components/PromptsTable'

const PromptsPage = async () => {
  const organization = await useCurrentOrganization()

  return (
    <Container>
      <PageHeader title="Manage your Prompt Templates" breadcrumbs={[]} />

      <Card>
        <Card.Title
          title={'Templates'}
          subtitle={
            'Prompt templates are a collection of prompts that can be shared across your organization.'
          }
        >
          <Card.Action>
            <AddPromptDialog organizationId={organization.id} />
          </Card.Action>
        </Card.Title>
        <PromptsTable />
      </Card>
    </Container>
  )
}
export default PromptsPage
