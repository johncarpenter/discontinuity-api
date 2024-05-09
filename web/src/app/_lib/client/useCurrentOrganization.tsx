import { auth } from '@clerk/nextjs'
import { getOrganizationById } from '@/prisma/services/organization'

export default async function useCurrentOrganization() {
  const { orgId } = auth()

  if (orgId === undefined || orgId === null) {
    throw Error('No organization')
  }

  const organization = await getOrganizationById(orgId)

  return { orgId, organization }
}
