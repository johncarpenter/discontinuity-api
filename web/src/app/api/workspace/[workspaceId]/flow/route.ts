import { createFlowLink, updateApiKey, updateFlowLink } from '@/prisma/services/flow'
import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Creates a new flow for the workspace
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

  const { name, endpoint, apikey, tags, description, type } = data

  if (!name || !endpoint || !type) {
    return NextResponse.json({ error: 'Missing Parameters' }, { status: 400 })
  }

  const key = await createFlowLink(workspaceId, name, endpoint, apikey, description, tags, type)

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

  const { sessionId, orgId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  if (orgId === null || orgId === undefined) {
    return NextResponse.json({}, { status: 401 })
  }

  const data = await req.json()

  const { id, name, endpoint, apikey, tags, description, type } = data

  if (!id || !name || !endpoint || !type) {
    return NextResponse.json({ error: 'Missing Parameters' }, { status: 400 })
  }
  const key = await updateFlowLink(id, orgId, workspaceId, name, endpoint, description, tags, type)

  if (apikey && apikey != '') {
    await updateApiKey(id, orgId, workspaceId, apikey)
  }

  return NextResponse.json({ key })
}
