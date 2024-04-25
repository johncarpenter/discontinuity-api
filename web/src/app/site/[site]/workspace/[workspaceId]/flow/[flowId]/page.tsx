import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getWorkspace } from '@/prisma/services/workspace'
import { setCookie, getCookie, hasCookie } from 'cookies-next'
import FlowPanel from '@/app/_components/FlowPanel'
import { getFlowLink } from '@/prisma/services/flow'

type WorkspaceFlowPageProps = {
  params: {
    siteId: string
    workspaceId: string
    flowId: string
  }
}

async function loginIfNotAuthenticated(workspace: any) {
  // Check if there is a cookie jwt
  const cookieName = `dsc-jwt-${workspace.id}`
  if (hasCookie(cookieName)) {
    return getCookie(cookieName)
  }

  const API_URL = process.env.NEXT_PUBLIC_DSC_API_URL
  const KEY = workspace.apikeys[0].client_id
  const SECRET = workspace.apikeys[0].client_secret

  const token = await fetch(`${API_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: KEY,
      client_secret: SECRET,
    }),
  })
  const { access_token } = await token.json()

  setCookie(cookieName, access_token, {
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return access_token
}

const WorkspaceFlowPage = async ({ params }: WorkspaceFlowPageProps) => {
  const organizationId = await useCurrentOrganization()
  const workspace = await getWorkspace(organizationId, params.workspaceId)
  const flow = await getFlowLink(params.flowId, workspace.id)

  return (
    <div className="">
      <FlowPanel workspaceId={workspace.id} flow={flow} />
    </div>
  )
}

export default WorkspaceFlowPage
