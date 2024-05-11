import { removeLLMModelFromOrganization } from '@/prisma/services/organization'
import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Deletes the workspace (archives it)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { organizationId: string; modelId: string } }
) {
  const { sessionId, orgId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  if (orgId === null || orgId === undefined) {
    return NextResponse.json({}, { status: 401 })
  }

  if (!params.organizationId || !params.modelId) {
    return NextResponse.json({ error: 'Organization and Model are required' }, { status: 400 })
  }

  console.log('Deleting workspace', params.modelId)

  // Delete workspace
  try {
    await removeLLMModelFromOrganization(params.modelId)
  } catch (error) {
    console.log('Failed to remove model from organization', error)
    return NextResponse.json({ error: 'Failed to remove model' }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
