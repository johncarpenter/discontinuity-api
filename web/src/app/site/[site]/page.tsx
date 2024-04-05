import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import ChatContainer from '@/components/ChatContainer'

export default async function SiteHome() {
  const organizationId = await useCurrentOrganization()

  return (
    <>
      <Container>
        <PageHeader title={`${organizationId}`} breadcrumbs={[]} />
        <ChatContainer assistant_id="asst_mutXMkuuGI8YUQjhgnbsfiVW" />
      </Container>
    </>
  )
}
