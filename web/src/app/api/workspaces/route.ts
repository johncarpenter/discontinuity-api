import { getOrganizationByIds } from '@/prisma/services/organization'
import { getUserById } from '@/prisma/services/user'
import { createWorkspace } from '@/prisma/services/workspace'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Create a new workspace for the organization
 *
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
  const { sessionId, orgId, userId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  const data = await req.json()

  const { name, description, isPrivate } = data

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  const org = await getOrganizationByIds(orgId, userId)

  const user = await getUserById(userId)

  const workspace = await createWorkspace(org.id, name, description, user.id, isPrivate)

  return NextResponse.json({ workspace })
}
