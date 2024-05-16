import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser, updateUser } from '@/prisma/services/user'
import { LicenseType } from '@prisma/client'
import {
  addPromptToOrganization,
  archiveOrganization,
  createOrganization,
} from '@/prisma/services/organization'

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  if (evt.type === 'user.created') {
    console.log('Creating User:', evt.data.id)
    const authUser = evt.data
    const fullName = authUser.first_name + ' ' + authUser.last_name
    const user = await createUser(
      authUser.id,
      fullName,
      authUser.image_url,
      authUser.email_addresses[0].email_address
    )

    const org = await createOrganization(authUser.id, 'Default', LicenseType.SOLO)
    console.log('Creating organization', org)

    await addPromptToOrganization(org.id, user.id, {
      name: 'Default Prompt',
      prompt: 'You are a helpful assistant',
      isPrivate: false,
    })
  } else if (evt.type === 'user.updated') {
    console.log('Updating User:', evt.data.id)
    const authUser = evt.data
    const fullName = authUser.first_name + ' ' + authUser.last_name
    await updateUser(
      authUser.id,
      fullName,
      authUser.image_url,
      authUser.email_addresses[0].email_address
    )
  } else if (evt.type === 'user.deleted') {
    console.log('Deleting User:', evt.data.id)
    await archiveOrganization(evt.data.id)
  } else if (evt.type === 'organization.created') {
    console.log('Creating Organization:', evt.data.id)
    const authOrg = evt.data
    const org = await createOrganization(authOrg.id, authOrg.name, LicenseType.TEAM)
    console.log('Created organization', org)

    await addPromptToOrganization(org.id, authOrg.created_by, {
      name: 'Default Prompt',
      prompt: 'You are a helpful assistant',
      isPrivate: false,
    })
  } else if (evt.type === 'organization.deleted') {
    console.log('Deleting Organization:', evt.data.id)
    await archiveOrganization(evt.data.id)
  }

  return new Response('', { status: 200 })
}
