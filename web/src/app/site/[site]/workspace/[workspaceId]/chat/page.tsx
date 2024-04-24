import useCurrentOrganization from '@/lib/client/useCurrentOrganization'
import { getWorkspace } from '@/prisma/services/workspace'
import ChatPanel from '@/app/_components/ChatPanel'
import { setCookie, getCookie, hasCookie } from 'cookies-next'

type WorkspaceSettingsPageProps = {
  params: {
    siteId: string
    workspaceId: string
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
    maxAge: 60 * 60 * 24,
    path: '/',
  })

  return access_token
}

const WorkspaceChatPage = async ({ params }: WorkspaceSettingsPageProps) => {
  const organizationId = await useCurrentOrganization()
  const workspace = await getWorkspace(organizationId, params.workspaceId)

  const token = await loginIfNotAuthenticated(workspace)

  return (
    <div className="">
      <ChatPanel workspaceId={workspace.id} token={token} />
    </div>
  )
}

export default WorkspaceChatPage
