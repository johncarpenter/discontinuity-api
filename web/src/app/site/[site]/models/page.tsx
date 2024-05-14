import Card from '@/components/Card'

import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import ModelsTable from '@/components/ModelsTable'
import { AddModelDialog } from '@/components/Dialogs/addmodeldialog'
import useCurrentOrganization from '@/lib/client/useCurrentOrganization'

const ModelsPage = async () => {
  const { organization } = await useCurrentOrganization()

  return (
    <Container>
      <PageHeader title="Manage your Models" breadcrumbs={[]} />

      <Card>
        <Card.Title
          title={'Your Models'}
          subtitle={'Connect with foundation models, or connect your own models to the system.'}
        >
          <Card.Action>
            <AddModelDialog organizationId={organization.id} />
          </Card.Action>
        </Card.Title>
        <ModelsTable />
      </Card>
    </Container>
  )
}
export default ModelsPage
