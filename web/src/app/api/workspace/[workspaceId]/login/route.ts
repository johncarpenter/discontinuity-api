import loginIfNotAuthenticated from '@/lib/server/loginIfNotAuthenticated'
import { getWorkspace } from '@/prisma/services/workspace'
import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { setCookie, getCookie, hasCookie } from 'cookies-next'
/**
 * Logs the default api token into the workspace
 *
 * @param req
 * @returns
 */
export async function GET(req: NextRequest, { params }: { params: { workspaceId: string } }) {
  const { sessionId, orgId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  if (orgId === null || orgId === undefined) {
    return NextResponse.json({}, { status: 401 })
  }

  const { workspaceId } = params

  const workspace = await getWorkspace(orgId, workspaceId)

  // Check if there is a cookie jwt
  const cookieName = `dsc-jwt-${workspace.id}`
  if (hasCookie(cookieName)) {
    return NextResponse.json({ access_token: getCookie(cookieName) })
  } else {
    console.log(`Authenticating workspace ${workspace.id}`)
    const access_token = await loginIfNotAuthenticated(workspace)

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
