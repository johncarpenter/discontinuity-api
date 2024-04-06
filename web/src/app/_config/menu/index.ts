import {
  ChartPieIcon,
  FolderIcon,
  HomeIcon,
  RectangleStackIcon,
  ServerStackIcon,
} from '@heroicons/react/24/outline'

export const workspaceMenu = (currentWorkspace: string) => [
  {
    name: 'Workspace',
    menuItems: [
      {
        name: 'Chat',
        href: `/workspace/${currentWorkspace}/chat`,
        description: 'Home Page',
        enabled: currentWorkspace !== '',
        visible: true,
        Icon: HomeIcon,
      },
      {
        name: 'Files',
        href: `/workspace/${currentWorkspace}/files`,
        description: 'Status and Monitoring',
        enabled: currentWorkspace !== '',
        visible: true,
        Icon: ServerStackIcon,
      },
      {
        name: 'Settings',
        href: `/workspace/${currentWorkspace}/settings`,
        description: 'Status and Monitoring',
        enabled: currentWorkspace !== '',
        visible: true,
        Icon: ServerStackIcon,
      },
    ],
  },
  {
    name: 'platform',
    menuItems: [
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
    name: 'account',
    menuItems: [
      {
        name: 'Manage',
        href: '/workspaces',
        description: 'Main Page',
        enabled: true,
        visible: true,
        Icon: RectangleStackIcon,
      },

      {
        name: 'Reports',
        href: '/',
        description: 'Analysis and Reporting',
        enabled: true,
        visible: true,
        Icon: FolderIcon,
      },
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
]
