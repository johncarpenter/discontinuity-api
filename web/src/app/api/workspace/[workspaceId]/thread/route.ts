import { upsertThread } from '@/prisma/services/threads'
import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Creates a new thread in the workspace
 *
 * @param req
 * @returns
 */
export async function POST(req: NextRequest, { params }: { params: { workspaceId: string } }) {
  const { workspaceId } = params

  const { sessionId, orgId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  if (orgId === null || orgId === undefined) {
    return NextResponse.json({}, { status: 401 })
  }

  const data = await req.json()

  const { name, shareLink } = data

  if (!shareLink) {
    return NextResponse.json({ error: 'Missing Parameters' }, { status: 400 })
  }

  const key = await upsertThread(workspaceId, name, shareLink)

  return NextResponse.json({ key })
}
