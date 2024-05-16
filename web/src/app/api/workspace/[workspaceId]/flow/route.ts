import { createFlowLink, updateApiKey, updateFlowLink } from '@/prisma/services/flow'
import { getOrganizationIdById } from '@/prisma/services/organization'
import { getUserById } from '@/prisma/services/user'
import { getWorkspaceById } from '@/prisma/services/workspace'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Creates a new flow for the workspace
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

  const org = await getOrganizationIdById(orgId != null ? orgId : userId)
  const wrk = await getWorkspaceById(org.id, workspaceId)
  if (!wrk) {
    return NextResponse.json({ error: 'Workspace not found' }, { status: 404 })
  }

  const data = await req.json()

  const { name, endpoint, apikey, tags, description, type } = data

  if (!name || !endpoint || !type) {
    return NextResponse.json({ error: 'Missing Parameters' }, { status: 400 })
  }

  const user = await getUserById(userId)

  const key = await createFlowLink(wrk.id, name, endpoint, apikey, description, tags, type, user.id)

  return NextResponse.json({ key })
}

/**
 * Updates a flow for the workspace
 *
 * @param req
 * @returns
 */

export async function PUT(req: NextRequest, { params }: { params: { workspaceId: string } }) {
  const { workspaceId } = params

  const { sessionId, orgId, userId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  const org = await getOrganizationIdById(orgId != null ? orgId : userId)
  const wrk = await getWorkspaceById(org.id, workspaceId)
  if (!wrk) {
    return NextResponse.json({ error: 'Workspace not found' }, { status: 404 })
  }

  const data = await req.json()

  const { id, name, endpoint, apikey, tags, description, type } = data

  if (!id || !name || !endpoint || !type) {
    return NextResponse.json({ error: 'Missing Parameters' }, { status: 400 })
  }
  const key = await updateFlowLink(id, org.id, wrk.id, name, endpoint, description, tags, type)

  if (apikey && apikey != '') {
    await updateApiKey(id, org.id, wrk.id, apikey)
  }

  return NextResponse.json({ key })
}
