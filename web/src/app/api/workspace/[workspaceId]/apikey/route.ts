import { createApiKey } from '@/prisma/services/apikey'
import { getOrganizationIdByIds } from '@/prisma/services/organization'
import { getUserById } from '@/prisma/services/user'
import { getWorkspaceById } from '@/prisma/services/workspace'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Creates a new apikey for the workspace
 *
 * @param req
 * @returns
 */
export async function POST(req: NextRequest, { params }: { params: { workspaceId: string } }) {
  const { workspaceId } = params

  const { sessionId, orgId, userId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  const data = await req.json()

  const { name } = data

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  const org = await getOrganizationIdByIds(orgId, userId)
  const wrk = await getWorkspaceById(org.id, workspaceId)
  if (!wrk) {
    return NextResponse.json({ error: 'Workspace not found' }, { status: 404 })
  }

  const user = await getUserById(userId)

  const key = await createApiKey(wrk.id, '*', name, user.id)

  return NextResponse.json({ key })
}
