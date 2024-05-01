import {
  ChartPieIcon,
  FolderIcon,
  RectangleStackIcon,
  ServerStackIcon,
  Cog8ToothIcon,
  ChatBubbleBottomCenterIcon,
  CubeTransparentIcon,
  PuzzlePieceIcon,
} from '@heroicons/react/24/outline'

import { LuLayoutDashboard } from 'react-icons/lu'

export const workspaceMenu = (currentWorkspace?: string) => [
  {
    name: 'Workspace',
    menuItems: [
      {
        name: 'Search and Discovery',
        href: `/workspace/${currentWorkspace}/chat`,
        description: 'Search through your documents',
        enabled: currentWorkspace !== '',
        visible: true,
        Icon: ChatBubbleBottomCenterIcon,
      },
      {
        name: 'Models',
        href: `/workspace/${currentWorkspace}/flow`,
        description: 'Custom Workflows, Agents and Models',
        enabled: currentWorkspace !== '',
        visible: true,
        Icon: CubeTransparentIcon,
      },
      {
        name: 'File Management',
        href: `/workspace/${currentWorkspace}/files`,
        description: 'File Management',
        enabled: currentWorkspace !== '',
        visible: true,
        Icon: ServerStackIcon,
      },
      {
        name: 'Integrations',
        href: '/',
        description: 'Integrated Services',
        enabled: true,
        visible: true,
        Icon: PuzzlePieceIcon,
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
]
