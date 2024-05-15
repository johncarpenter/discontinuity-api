import { getOrganizationIdByIds } from '@/prisma/services/organization'
import { upsertThread } from '@/prisma/services/threads'
import { getUserById } from '@/prisma/services/user'
import { getWorkspaceById } from '@/prisma/services/workspace'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Creates a new thread in the workspace
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

  const org = await getOrganizationIdByIds(orgId, userId)
  const wrk = await getWorkspaceById(org.id, workspaceId)
  if (!wrk) {
    return NextResponse.json({ error: 'Workspace not found' }, { status: 404 })
  }

  const data = await req.json()

  const { name, shareLink, model, prompt } = data

  if (!shareLink) {
    return NextResponse.json({ error: 'Missing Parameters' }, { status: 400 })
  }

  const user = await getUserById(userId)

  const key = await upsertThread(wrk.id, name, shareLink, user.id, model, prompt)

  return NextResponse.json({ key })
}
