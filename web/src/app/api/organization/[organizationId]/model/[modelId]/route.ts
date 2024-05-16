import { getOrganizationById, removeLLMModelFromOrganization } from '@/prisma/services/organization'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Deletes the workspace (archives it)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { organizationId: string; modelId: string } }
) {
  const { sessionId, orgId, userId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  if (!params.organizationId || !params.modelId) {
    return NextResponse.json({ error: 'Organization and Model are required' }, { status: 400 })
  }

  const org = await getOrganizationById(orgId != null ? orgId : userId)

  // TODO - Need to validate that the user can delete the model

  try {
    await removeLLMModelFromOrganization(org.id, params.modelId)
  } catch (error) {
    console.log('Failed to remove model from organization', error)
    return NextResponse.json({ error: 'Failed to remove model' }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
