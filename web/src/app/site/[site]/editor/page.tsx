import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import Iframe from 'react-iframe'

const WorkflowEditor = async () => {
  //const organizationId = await useCurrentOrganization()
  // todo need the link from the organization settings

  const flowlink = 'https://flow.discontinuity.ai/'

  return (
    <div className="">
      <Container>
        <PageHeader title="Workflow Editor" breadcrumbs={[]} />
        <div className="flex min-h-screen">
          <Iframe
            url={flowlink}
            id=""
            className="w-full h-full flex-1 min-h-[85vh] border-none"
            display="block"
            position="relative"
          />
        </div>
      </Container>
    </div>
  )
}

export default WorkflowEditor
