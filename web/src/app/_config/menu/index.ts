import {
  ChartPieIcon,
  FolderIcon,
  HomeIcon,
  RectangleStackIcon,
  ServerStackIcon,
  MagnifyingGlassCircleIcon,
  Cog8ToothIcon,
} from '@heroicons/react/24/outline'

export const workspaceMenu = (currentWorkspace: string) => [
  {
    name: 'Workspace',
    menuItems: [
      {
        name: 'Generate',
        href: `/workspace/${currentWorkspace}/chat`,
        description: 'Generate',
        enabled: currentWorkspace !== '',
        visible: true,
        Icon: HomeIcon,
      },
      {
        name: 'Search & Discover',
        href: `/workspace/${currentWorkspace}/search`,
        description: 'Search and Discover',
        enabled: currentWorkspace !== '',
        visible: true,
        Icon: MagnifyingGlassCircleIcon,
      },
      {
        name: 'Files',
        href: `/workspace/${currentWorkspace}/files`,
        description: 'File Management',
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
        Icon: Cog8ToothIcon,
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
