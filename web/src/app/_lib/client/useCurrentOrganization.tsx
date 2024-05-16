import { auth } from '@clerk/nextjs/server'
import { getOrganizationById } from '@/prisma/services/organization'

export default async function useCurrentOrganization() {
  const { orgId, userId } = auth()

  return await getOrganizationById(orgId != null ? orgId : userId)
}
