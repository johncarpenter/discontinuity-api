import { auth } from '@clerk/nextjs'

export default async function useCurrentOrganization() {
  const { orgId } = auth()

  if (orgId === undefined || orgId === null) {
    throw Error('No organization')
  }

  return orgId
}
