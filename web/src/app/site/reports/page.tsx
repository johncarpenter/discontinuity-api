import Container from '@/components/Container'
import Card from '@/components/Card'
import PageHeader from '@/components/PageHeader'
export default async function ReportsHome() {
  return (
    <>
      <Container>
        <PageHeader title={`Reports`} breadcrumbs={[]} />
        <Card>
          <Card.Body title="Your Custom Reports" subtitle="View your custom reports"></Card.Body>
        </Card>
      </Container>
    </>
  )
}
