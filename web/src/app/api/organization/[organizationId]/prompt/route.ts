import { addPromptToOrganization, getOrganizationById } from '@/prisma/services/organization'
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

  const { name, prompt, isPrivate } = data

  if (!name || !prompt) {
    return NextResponse.json({ error: 'Missing Parameters' }, { status: 400 })
  }

  const org = await getOrganizationById(orgId != null ? orgId : userId)
  const user = await getUserById(userId)

  const key = await addPromptToOrganization(org.id, user.id, {
    name,
    prompt,
    isPrivate,
  })

  return NextResponse.json({ key })
}
