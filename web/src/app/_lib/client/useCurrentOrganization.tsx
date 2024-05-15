import { auth } from '@clerk/nextjs/server'
import { getOrganizationByIds } from '@/prisma/services/organization'

export default async function useCurrentOrganization() {
  const { orgId, userId } = auth()

  return await getOrganizationByIds(orgId, userId)
}
