import { addLLMModelToOrganization } from '@/prisma/services/organization'
import { getUserById } from '@/prisma/services/user'
import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

/** Add a model to the organization
 *
 */
export async function POST(req: NextRequest, { params }: { params: { organizationId: string } }) {
  const { sessionId, orgId, userId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  if (orgId === null || orgId === undefined) {
    return NextResponse.json({}, { status: 401 })
  }

  const data = await req.json()

  const { name, source, apikey } = data

  if (!name || !source || !apikey) {
    return NextResponse.json({ error: 'Missing Parameters' }, { status: 400 })
  }

  const user = await getUserById(userId)

  const key = await addLLMModelToOrganization(params.organizationId, {
    name,
    source,
    apikey,
    creatorId: user.id,
  })

  return NextResponse.json({ key })
}
