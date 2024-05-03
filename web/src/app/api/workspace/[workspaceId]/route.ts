import { archiveWorkspace } from '@/prisma/services/workspace'
import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Deletes the workspace (archives it)
 */
export async function DELETE(req: NextRequest, { params }: { params: { workspaceId: string } }) {
  const { sessionId, orgId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  if (orgId === null || orgId === undefined) {
    return NextResponse.json({}, { status: 401 })
  }

  if (!params.workspaceId) {
    return NextResponse.json({ error: 'workspaceId is required' }, { status: 400 })
  }

  console.log('Deleting workspace', params.workspaceId)

  // Delete workspace
  try {
    await archiveWorkspace(orgId, params.workspaceId)
  } catch (error) {
    console.log('Failed to delete workspace', error)
    return NextResponse.json({ error: 'Failed to delete workspace' }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
