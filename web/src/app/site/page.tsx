import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Organization } from '@/lib/server/organizations'
import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import ChatContainer from '@/components/ChatContainer'

export default async function SiteHome() {
  const organization: Organization = await useCurrentOrganization()

  return (
    <>
      <Container>
        <PageHeader title={`${organization.name}`} breadcrumbs={[]} />
        <ChatContainer assistant_id="asst_mutXMkuuGI8YUQjhgnbsfiVW" />
      </Container>
    </>
  )
}
