export interface Dashboard {
  title: string
  description: string
  slug: string
  embed_type: 'LOOKER' | 'URL'
  type: 'SUMMARY' | 'ECOMMERCE' | 'EXPERIENCE' | 'LOGISTICS' | 'RETAIL'
  url: string
}

export interface Integration {
  status: string
  href: string
  brandName: string
  integrationName: string
  description: string
  statusText: string
  environment: string
}

export interface Organization {
  id: string
  name: string
  slug: string
  edition: 'TRIAL' | 'FOUNDATION' | 'OPTIMIZE' | 'ELEVATE'
  am: string
  embed_models: string[]
  embed_dashboards: Dashboard[]
  integrations: Integration[]
}

/**
 *
 * These are the testing organizations
 *
 */
const testOrganizations: Organization[] = [
  {
    id: 'org_2X5EtqN2HV6ssgkUdUEVqAYlXox',
    name: 'BlackSquare',
    slug: 'blacksquare',
    edition: 'ELEVATE',
    am: 'John Carpenter <john.carpenter@blacksquare.io>',
    integrations: [
      {
        status: 'online',
        href: 'https://shipstation.com/',
        brandName: 'WineCollective',
        integrationName: 'ShipStation',
        description: 'Warehouse Fulfilment Integration',
        statusText: 'Active',
        environment: 'Production',
      },
    ],
    embed_models: ['insight-indybrands', 'ga4', 'wc_analytics'],
    embed_dashboards: [
      {
        title: 'My Summary',
        description: 'Sales Summary',
        slug: 'summary',
        embed_type: 'LOOKER',
        type: 'SUMMARY',
        url: '17',
      },
      {
        title: 'WineCollective Subscriptions',
        description: 'WineCollective Details Subscriptions',
        slug: 'winecollective-subscription-detail',
        embed_type: 'LOOKER',
        type: 'ECOMMERCE',
        url: '2',
      },
      {
        title: 'Legacy Panel',
        description: 'Data Studio Edition Panel',
        slug: 'client-summary-detail',
        embed_type: 'URL',
        type: 'SUMMARY',
        url: 'https://lookerstudio.google.com/embed/reporting/fdd15f52-057c-4524-bc60-82d6ff9e2d19/page/p_8oozkjv42c',
      },
    ],
  },
]

/**
 *
 * These are the production organizations
 */
const organizations: Organization[] = [
  {
    id: 'org_2XGrQY6Om7rx3DsakBsAXVeWir4',
    name: 'BlackSquare',
    slug: 'blacksquare',
    edition: 'ELEVATE',
    am: 'John Carpenter <john.carpenter@blacksquare.io>',
    integrations: [
      {
        status: 'online',
        href: 'https://shipstation.com/',
        brandName: 'WineCollective',
        integrationName: 'ShipStation',
        description: 'Warehouse Fulfilment Integration',
        statusText: 'Active',
        environment: 'Production',
      },
    ],
    embed_models: ['insight-indybrands', 'ga4', 'wc_analytics'],
    embed_dashboards: [
      {
        title: 'My Summary',
        description: 'Sales Summary',
        slug: 'summary',
        embed_type: 'LOOKER',
        type: 'SUMMARY',
        url: '17',
      },
      {
        title: 'WineCollective Subscriptions',
        description: 'WineCollective Details Subscriptions',
        slug: 'winecollective-subscription-detail',
        embed_type: 'LOOKER',
        type: 'ECOMMERCE',
        url: '2',
      },
      {
        title: 'Legacy Panel',
        description: 'Data Studio Edition Panel',
        slug: 'client-summary-detail',
        embed_type: 'URL',
        type: 'SUMMARY',
        url: 'https://lookerstudio.google.com/embed/reporting/fdd15f52-057c-4524-bc60-82d6ff9e2d19/page/p_8oozkjv42c',
      },
    ],
  },
  {
    id: 'org_2XGrgB11ooM40HR5wHu4N6BET3h',
    name: 'Indy Brands',
    slug: 'indy-brands',
    edition: 'ELEVATE',
    am: 'Support <hello@blacksquare.io>',
    embed_models: ['insight-indybrands', 'ga4', 'wc_analytics'],
    embed_dashboards: [
      {
        title: 'WineCollective Summary',
        description: 'Sales Summary',
        slug: 'summary',
        embed_type: 'LOOKER',
        type: 'SUMMARY',
        url: '1',
      },
      {
        title: 'WineCollective Subscriptions',
        description: 'WineCollective Details Subscriptions',
        slug: 'winecollective-subscription-detail',
        embed_type: 'LOOKER',
        type: 'ECOMMERCE',
        url: '2',
      },
      {
        title: 'Legacy Panel',
        description: 'Data Studio Edition Panel',
        slug: 'client-summary-detail',
        embed_type: 'URL',
        type: 'SUMMARY',
        url: 'https://lookerstudio.google.com/embed/reporting/fdd15f52-057c-4524-bc60-82d6ff9e2d19/page/p_8oozkjv42c',
      },
      {
        title: 'WineCollective Ads',
        description: 'WineCollective Ads Experience',
        slug: 'winecollective-ads',
        embed_type: 'LOOKER',
        type: 'EXPERIENCE',
        url: '12',
      },
      {
        title: 'WineCollective Email Experience',
        description: 'WineCollective Email Metrics',
        slug: 'winecollective-email',
        embed_type: 'LOOKER',
        type: 'EXPERIENCE',
        url: '5',
      },
      {
        title: 'WineCollective Daily Sales',
        description: 'WineCollective Daily Sales',
        slug: 'winecollective-daily-sales',
        embed_type: 'LOOKER',
        type: 'RETAIL',
        url: '3',
      },
      {
        title: 'WineCollective Logistics',
        description: 'WineCollective Shipping Metrics',
        slug: 'winecollective-logistics',
        embed_type: 'LOOKER',
        type: 'LOGISTICS',
        url: '13',
      },
    ],
    integrations: [
      {
        status: 'online',
        href: 'https://shipstation.com/',
        brandName: 'WineCollective',
        integrationName: 'ShipStation',
        description: 'Warehouse Fulfilment Integration',
        statusText: 'Active',
        environment: 'Production',
      },
      {
        status: 'online',
        href: 'https://admin.shopify.com/',
        brandName: 'WineCollective',
        integrationName: 'Shopify',
        description: 'Ecommerce Integration',
        statusText: 'Active',
        environment: 'Production',
      },
      {
        status: 'online',
        href: 'https://analytics.google.com/',
        brandName: 'WineCollective',
        integrationName: 'GA4',
        description: 'Tracking Analytics',
        statusText: 'Active',
        environment: 'Production',
      },
      {
        status: 'online',
        href: 'https://klaviyo.com/',
        brandName: 'WineCollective',
        integrationName: 'Klaviyo',
        description: 'Email and Tracking Analytics',
        statusText: 'Active',
        environment: 'Production',
      },
    ],
  },
]

export const getOrganization = (orgId: string) => {
  if (process.env.NODE_ENV === 'development') {
    return testOrganizations.filter((org) => org.id === orgId)[0]
  }

  return organizations.filter((org) => org.id === orgId)[0]
}
