import { addPromptToOrganization, createOrganization } from '@/prisma/services/organization'
import { getUserById } from '@/prisma/services/user'
import { auth } from '@clerk/nextjs'
import { LicenseType } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

/** Create the initial organization
 *
 */
export async function POST(req: NextRequest) {
  const { sessionId, userId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  const data = await req.json()

  const license = LicenseType.TRIAL

  const { name, orgId } = data

  if (!name || !license) {
    return NextResponse.json({ error: 'Missing Parameters' }, { status: 400 })
  }

  const key = await createOrganization(orgId, name, license)

  const user = await getUserById(userId)

  await addPromptToOrganization(orgId, user.id, {
    name: 'Default Prompt',
    prompt: 'You are a helpful assistant',
    isPrivate: false,
  })

  return NextResponse.json({ key })
}
