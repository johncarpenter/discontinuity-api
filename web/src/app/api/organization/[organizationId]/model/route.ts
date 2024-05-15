import { addLLMModelToOrganization, getOrganizationByIds } from '@/prisma/services/organization'
import { getUserById } from '@/prisma/services/user'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

/** Add a model to the organization
 *
 */
export async function POST(req: NextRequest) {
  const { sessionId, orgId, userId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  const data = await req.json()

  const { name, source, apikey } = data

  if (!name || !source || !apikey) {
    return NextResponse.json({ error: 'Missing Parameters' }, { status: 400 })
  }

  const org = await getOrganizationByIds(orgId, userId)
  const user = await getUserById(userId)

  const key = await addLLMModelToOrganization(org.id, user.id, {
    name,
    source,
    apikey,
  })

  return NextResponse.json({ key })
}
