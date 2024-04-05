import { createWorkspace } from '@/prisma/services/workspace'
import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Create a new workspace for the organization
 *
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
  const { sessionId, orgId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  if (orgId === null || orgId === undefined) {
    return NextResponse.json({}, { status: 401 })
  }

  const data = await req.json()

  const { name } = data

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  const workspace = await createWorkspace(orgId, name)

  return NextResponse.json({ workspace })
}
