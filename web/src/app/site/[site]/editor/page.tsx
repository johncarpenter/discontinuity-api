import useCurrentOrganization from '@/app/_lib/client/useCurrentOrganization'

import jwt from 'jsonwebtoken'
import SecureIFrame from '@/components/SecureIframe'

const WorkflowEditor = async () => {
  const { orgId, organization } = await useCurrentOrganization()

  const token = jwt.sign({ orgId }, process.env.JWT_SECRET ?? '', {
    expiresIn: '1h',
  })

  const flowlink = organization.flow_endpoint

  return (
    <div className="">
      <SecureIFrame token={token} url={flowlink} />
    </div>
  )
}

export default WorkflowEditor
