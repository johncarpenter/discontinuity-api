import {
  addPromptToOrganization,
  createOrganization,
  getOrganizationIdById,
} from '@/prisma/services/organization'
import { getUserById } from '@/prisma/services/user'
import { auth } from '@clerk/nextjs/server'
import { LicenseType } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Ensure that the organization is loaded and the user is authenticated
 * @param _
 * @param param1
 * @returns
 */
export async function GET() {
  const { sessionId, orgId, userId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  const org = await getOrganizationIdById(orgId != null ? orgId : userId)

  if (!org) {
    return NextResponse.json({ error: 'Organization not found' }, { status: 404 })
  }

  return NextResponse.json({ org })
}

/** Create the initial organization
 *
 */
export async function POST(req: NextRequest) {
  const { sessionId, userId, orgId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  const id = (orgId != null ? orgId : userId) as string

  const data = await req.json()

  const license = LicenseType.SOLO

  const { name } = data

  if (!name || !license) {
    return NextResponse.json({ error: 'Missing Parameters' }, { status: 400 })
  }
  console.log(userId, orgId, name, license)

  const org = await createOrganization(id, name, license)

  const user = await getUserById(userId)

  await addPromptToOrganization(org.id, user.id, {
    name: 'Default Prompt',
    prompt: 'You are a helpful assistant',
    isPrivate: false,
  })

  return NextResponse.json({ org })
}
