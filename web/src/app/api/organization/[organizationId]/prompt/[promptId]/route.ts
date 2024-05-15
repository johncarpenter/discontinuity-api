import {
  getOrganizationByIds,
  removePromptFromOrganization,
  updatePrompt,
} from '@/prisma/services/organization'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Deletes the workspace (archives it)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { organizationId: string; promptId: string } }
) {
  const { sessionId, orgId, userId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  if (!params.organizationId || !params.promptId) {
    return NextResponse.json({ error: 'Organization and Model are required' }, { status: 400 })
  }

  console.log('Deleting prompt', params.promptId)
  const org = await getOrganizationByIds(orgId, userId)

  // Delete workspace
  try {
    await removePromptFromOrganization(org.id, params.promptId)
  } catch (error) {
    console.log('Failed to remove prompt from organization', error)
    return NextResponse.json({ error: 'Failed to remove prompt' }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}

export async function PUT(req: NextRequest) {
  const { sessionId, orgId, userId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  const org = await getOrganizationByIds(orgId, userId)

  const data = await req.json()

  const { id, name, prompt, isPrivate } = data

  if (!id || !name || !prompt || isPrivate === undefined) {
    return NextResponse.json({ error: 'Missing Parameters' }, { status: 400 })
  }
  const key = await updatePrompt(org.id, { id, name, prompt, isPrivate })

  return NextResponse.json({ key })
}
