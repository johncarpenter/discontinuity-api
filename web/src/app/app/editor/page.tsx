import useCurrentOrganization from '@/app/_lib/client/useCurrentOrganization'
import jwt from 'jsonwebtoken'

import SecureIFrame from '@/components/SecureIframe'
import { LicenseType } from '@prisma/client'
import EditorPlaceholder from '@/components/EditorPlaceholder'

const WorkflowEditor = async () => {
  const organization = await useCurrentOrganization()

  const token = jwt.sign({ orgId: organization.id }, process.env.JWT_SECRET ?? '', {
    expiresIn: '1h',
  })

  const flowlink = organization.flow_endpoint

  return (
    <div className="mt-18">
      {organization.flow_endpoint === '' || organization.license !== LicenseType.PRO ? (
        <EditorPlaceholder />
      ) : (
        <SecureIFrame token={token} url={flowlink} />
      )}
    </div>
  )
}

export default WorkflowEditor
