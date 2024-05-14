import Card from '@/components/Card'

import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { AddPromptDialog } from '@/app/_components/Dialogs/addpromptdialog'
import PromptsTable from '@/app/_components/PromptsTable'

const PromptsPage = async () => {
  const { organization } = await useCurrentOrganization()

  return (
    <Container>
      <PageHeader title="Manage your Prompts" breadcrumbs={[]} />

      <Card>
        <Card.Title
          title={'Your Prompt'}
          subtitle={'Prompts are a simple and fast way to configure the output from your models.'}
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
