import loginIfNotAuthenticated from '@/lib/server/loginIfNotAuthenticated'
import { getWorkspaceById } from '@/prisma/services/workspace'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { setCookie, getCookie, hasCookie } from 'cookies-next'
import { getOrganizationIdById } from '@/prisma/services/organization'
/**
 * Logs the default api token into the workspace
 *
 * @param req
 * @returns
 */
export async function GET(req: NextRequest, { params }: { params: { workspaceId: string } }) {
  const { sessionId, orgId, userId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }
  const { workspaceId } = params

  const org = await getOrganizationIdById(orgId != null ? orgId : userId)
  const wrk = await getWorkspaceById(org.id, workspaceId)
  if (!wrk) {
    return NextResponse.json({ error: 'Workspace not found' }, { status: 404 })
  }

  // Check if there is a cookie jwt
  const cookieName = `dsc-jwt-${wrk.id}`
  if (hasCookie(cookieName)) {
    return NextResponse.json({ access_token: getCookie(cookieName) })
  } else {
    console.log(`Authenticating workspace ${wrk.id}`)
    const access_token = await loginIfNotAuthenticated(wrk)

    const res = NextResponse.json({ access_token })

    setCookie(cookieName, access_token, {
      maxAge: 60 * 60 * 24,
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      req,
      res,
    })

    return res
  }
}
