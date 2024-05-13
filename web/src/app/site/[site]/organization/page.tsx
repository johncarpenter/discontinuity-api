import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { OrganizationProfile } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function OrganizationProfilePage() {
  return (
    <Container>
      <PageHeader title="Organization" breadcrumbs={[]} />
      <OrganizationProfile
        appearance={{
          baseTheme: dark,
        }}
      />
    </Container>
  )
}
