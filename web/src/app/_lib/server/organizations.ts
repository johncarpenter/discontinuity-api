export interface Organization {
  id: string
  name: string
  slug: string
  edition: 'TRIAL' | 'BASIC' | 'ENTERPRISE'
}

/**
 *
 * These are the testing organizations
 *
 */
const testOrganizations: Organization[] = [
  {
    id: 'org_2YVG4Heyprhs1T3SIVPCv70WhbH',
    name: 'Demo',
    slug: 'demo',
    edition: 'ENTERPRISE',
  },
]

/**
 *
 * These are the production organizations
 */
const organizations: Organization[] = []

export const getOrganization = (orgId: string) => {
  if (process.env.NODE_ENV === 'development') {
    return testOrganizations.filter((org) => org.id === orgId)[0]
  }

  return organizations.filter((org) => org.id === orgId)[0]
}
