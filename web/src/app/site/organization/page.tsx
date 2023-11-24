import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { OrganizationProfile } from '@clerk/nextjs'

export default function OrganizationProfilePage() {
  return (
    <Container>
      <PageHeader title="Organization" breadcrumbs={[]} />
      <OrganizationProfile />
    </Container>
  )
}
