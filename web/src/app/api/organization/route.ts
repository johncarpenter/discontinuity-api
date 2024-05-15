import { addPromptToOrganization, createOrganization } from '@/prisma/services/organization'
import { getUserById } from '@/prisma/services/user'
import { auth } from '@clerk/nextjs/server'
import { LicenseType } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

/** Create the initial organization
 *
 */
export async function POST(req: NextRequest) {
  const { sessionId, userId, orgId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  const data = await req.json()

  const license = LicenseType.SOLO

  const { name } = data

  if (!name || !license) {
    return NextResponse.json({ error: 'Missing Parameters' }, { status: 400 })
  }
  console.log(userId, orgId, name, license)

  const org = await createOrganization(userId, orgId, name, license)

  const user = await getUserById(userId)

  await addPromptToOrganization(org.id, user.id, {
    name: 'Default Prompt',
    prompt: 'You are a helpful assistant',
    isPrivate: false,
  })

  return NextResponse.json({ org })
}
