import { deleteApiKey } from '@/prisma/services/apikey'
import { getOrganizationByIds } from '@/prisma/services/organization'
import { getWorkspaceById } from '@/prisma/services/workspace'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Deletes the workspace (archives it)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { workspaceId: string; apikeyId: string } }
) {
  const { sessionId, orgId, userId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  if (!params.workspaceId || !params.apikeyId) {
    return NextResponse.json({ error: 'Organization and Model are required' }, { status: 400 })
  }

  const org = await getOrganizationByIds(orgId, userId)
  const wrk = await getWorkspaceById(org.id, params.workspaceId)
  if (!wrk) {
    return NextResponse.json({ error: 'Workspace not found' }, { status: 404 })
  }

  // TODO - Need to validate that the user can delete the model
  console.log('Deleting API Key', params, params.apikeyId)
  try {
    await deleteApiKey(wrk.id, params.apikeyId)
  } catch (error) {
    console.log('Failed to remove model from organization', error)
    return NextResponse.json({ error: 'Failed to remove model' }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
