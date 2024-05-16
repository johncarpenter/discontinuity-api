import { getOrganizationIdById } from '@/prisma/services/organization'
import { archiveWorkspace, getWorkspaceById } from '@/prisma/services/workspace'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Deletes the workspace (archives it)
 */
export async function DELETE(req: NextRequest, { params }: { params: { workspaceId: string } }) {
  const { sessionId, orgId, userId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  if (!params.workspaceId) {
    return NextResponse.json({ error: 'workspaceId is required' }, { status: 400 })
  }
  const org = await getOrganizationIdById(orgId != null ? orgId : userId)
  const wrk = await getWorkspaceById(org.id, params.workspaceId)
  if (!wrk) {
    return NextResponse.json({ error: 'Workspace not found' }, { status: 404 })
  }

  console.log('Deleting workspace', params.workspaceId)

  // Delete workspace
  try {
    await archiveWorkspace(org.id, wrk.id)
  } catch (error) {
    console.log('Failed to delete workspace', error)
    return NextResponse.json({ error: 'Failed to delete workspace' }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
