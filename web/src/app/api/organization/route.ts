import { createOrganization } from '@/prisma/services/organization'
import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

/** Create the initial workspace
 *
 */
export async function POST(req: NextRequest) {
  const { sessionId, orgId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  if (orgId === null || orgId === undefined) {
    return NextResponse.json({}, { status: 401 })
  }

  const data = await req.json()

  const { name, license, endpoint } = data

  if (!name || !license) {
    return NextResponse.json({ error: 'Missing Parameters' }, { status: 400 })
  }

  const key = await createOrganization(orgId, name, license, endpoint)

  return NextResponse.json({ key })
}
