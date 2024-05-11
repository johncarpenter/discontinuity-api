import {
  ChartPieIcon,
  FolderIcon,
  RectangleStackIcon,
  ServerStackIcon,
  Cog8ToothIcon,
  ChatBubbleBottomCenterIcon,
  CubeTransparentIcon,
  QueueListIcon,
} from '@heroicons/react/24/outline'

import { LuLayoutDashboard } from 'react-icons/lu'

export const workspaceMenu = (currentWorkspace?: string) => [
  {
    name: 'Workspace',
    menuItems: [
      {
        name: 'Chat+',
        href: `/workspace/${currentWorkspace}/chat`,
        description: 'Main Page',
        enabled: currentWorkspace !== undefined,
        visible: true,
        Icon: ChatBubbleBottomCenterIcon,
      },
      {
        name: 'Document Search',
        href: `/workspace/${currentWorkspace}/search`,
        description: 'Search through your documents',
        enabled: currentWorkspace !== undefined,
        visible: true,
        Icon: RectangleStackIcon,
      },

      // {
      //   name: 'Data Analysis',
      //   href: `/workspace/${currentWorkspace}/data`,
      //   description: 'Analyze your documents',
      //   enabled: currentWorkspace !== '',
      //   visible: true,
      //   Icon: ChatBubbleBottomCenterIcon,
      // },
      {
        name: 'Workflows',
        href: `/workspace/${currentWorkspace}/flow`,
        description: 'Custom Workflows, Agents and Models',
        enabled: currentWorkspace !== undefined,
        visible: true,
        Icon: CubeTransparentIcon,
      },

      {
        name: 'Threads',
        href: `/workspace/${currentWorkspace}/threads`,
        description: 'Organize your works',
        enabled: currentWorkspace !== undefined,
        visible: true,
        Icon: QueueListIcon,
      },
      // {
      //   name: 'Integrations',
      //   href: '/integrations',
      //   description: 'Integrated Services',
      //   enabled: false,
      //   visible: true,
      //   Icon: PuzzlePieceIcon,
      // },
      {
        name: 'File Management',
        href: `/workspace/${currentWorkspace}/files`,
        description: 'File Management',
        enabled: currentWorkspace !== undefined,
        visible: true,
        Icon: ServerStackIcon,
      },
      {
        name: 'Workspace Settings',
        href: `/workspace/${currentWorkspace}/settings`,
        description: 'Status and Monitoring',
        enabled: currentWorkspace !== undefined,
        visible: true,
        Icon: Cog8ToothIcon,
      },
    ],
  },
  {
    name: 'platform',
    menuItems: [
      {
        name: 'Workflow Editor',
        href: '/editor',
        description: 'No-code workflow editor',
        enabled: true,
        visible: true,
        Icon: LuLayoutDashboard,
      },
      {
        name: 'Manage Workspaces',
        href: '/workspaces',
        description: 'Main Page',
        enabled: true,
        visible: true,
        Icon: RectangleStackIcon,
      },

      {
        name: 'Reports (coming soon)',
        href: '/reports',
        description: 'Analysis and Reporting',
        enabled: false,
        visible: true,
        Icon: FolderIcon,
      },
      {
        name: 'Analytics (coming soon)',
        href: '/analytics',
        description: 'Dashboards',
        enabled: false,
        visible: true,
        Icon: ChartPieIcon,
      },
      {
        name: 'Organization Settings',
        href: `/settings`,
        description: 'Settings for your organization',
        enabled: true,
        visible: true,
        Icon: ServerStackIcon,
      },
    ],
  },
]
