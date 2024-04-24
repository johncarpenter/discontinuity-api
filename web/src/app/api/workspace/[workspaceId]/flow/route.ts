import { createFlowLink } from '@/prisma/services/flow'
import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Creates new flow link
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

  const { name, endpoint, apikey } = data

  if (!name && !endpoint && !apikey) {
    return NextResponse.json({ error: 'Name, Endpoint and API Key are required' }, { status: 400 })
  }

  const flowLink = await createFlowLink(workspaceId, name, endpoint, apikey)

  return NextResponse.json({ flowLink })
}
