import { auth } from '@clerk/nextjs'
import { getOrganization } from '@/lib/server/organizations'

export default async function useCurrentOrganization() {
  const { orgId } = auth()

  if (orgId === undefined || orgId === null) {
    throw Error('No organization')
  }

  return getOrganization(orgId)
}
