import {
  ChartPieIcon,
  FolderIcon,
  HomeIcon,
  LightBulbIcon,
  RectangleStackIcon,
  ServerStackIcon,
} from '@heroicons/react/24/outline'

export const workspaceMenu = () => [
  {
    name: 'platform',
    menuItems: [
      {
        name: 'Home',
        href: `/`,
        description: 'Home Page',
        enabled: true,
        visible: true,
        Icon: HomeIcon,
      },
      {
        name: 'Support',
        href: `/support`,
        description: 'Status and Monitoring',
        enabled: true,
        visible: true,
        Icon: ServerStackIcon,
      },
    ],
  },
  {
    name: 'Data',
    menuItems: [
      {
        name: 'Analytics',
        href: '/',
        description: 'Dashboards',
        enabled: true,
        visible: true,
        Icon: ChartPieIcon,
      },
    ],
  },
  {
    name: 'Applications',
    menuItems: [
      {
        name: 'Applications',
        href: '/reports',
        description: 'Main Page',
        enabled: true,
        visible: true,
        Icon: RectangleStackIcon,
      },

      {
        name: 'Reports',
        href: '/reports',
        description: 'Analysis and Reporting',
        enabled: true,
        visible: true,
        Icon: FolderIcon,
      },
    ],
  },
  {
    name: 'Elevate',
    menuItems: [
      {
        name: 'Research and Insights',
        href: '/research',
        description: 'Main Page',
        enabled: true,
        visible: true,
        Icon: LightBulbIcon,
      },
    ],
  },
]
