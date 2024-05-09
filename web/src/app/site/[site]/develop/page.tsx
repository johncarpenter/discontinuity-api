import useCurrentOrganization from '@/app/_lib/client/useCurrentOrganization'
import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'

import jwt from 'jsonwebtoken'
import SecureIFrame from '@/components/SecureIframe'

const WorkflowEditor = async () => {
  const { orgId } = await useCurrentOrganization()

  const token = jwt.sign({ orgId }, process.env.JWT_SECRET ?? '', {
    expiresIn: '1h',
  })

  const flowlink = 'http://localhost:3005/'

  return (
    <div className="">
      <Container>
        <PageHeader title="Workflow Editor" breadcrumbs={[]} />
        <SecureIFrame token={token} url={flowlink} />
      </Container>
    </div>
  )
}

export default WorkflowEditor
