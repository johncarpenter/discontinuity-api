import Container from '@/components/Container'
import Card from '@/components/Card'
import PageHeader from '@/components/PageHeader'
import { Organization } from '@/lib/server/organizations'
import useCurrentOrganization from '@/lib/client/useCurrentOrganization'

export default async function SiteHome() {
  const organization: Organization = await useCurrentOrganization()

  return (
    <>
      <Container>
        <PageHeader title={`${organization.name}`} breadcrumbs={[]} />
        <Card>home</Card>

        <Container.Title title="At A Glance" subtitle="" />
      </Container>
    </>
  )
}
