// app/api/documents/[key]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { S3Client, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getOrganizationIdById } from '@/prisma/services/organization'
import { getWorkspaceById } from '@/prisma/services/workspace'

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
})

const Bucket = `${process.env.AWS_BUCKET_NAME as string}`

export async function GET(
  _: NextRequest,
  { params }: { params: { workspaceId: string; key: string } }
) {
  const { workspaceId, key } = params

  const { sessionId, orgId, userId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  const org = await getOrganizationIdById(orgId != null ? orgId : userId)
  const wrk = await getWorkspaceById(org.id, workspaceId)
  if (!wrk) {
    return NextResponse.json({ error: 'Workspace not found' }, { status: 404 })
  }

  const keyWithPath = `${wrk.id}/${key}`

  const command = new GetObjectCommand({ Bucket, Key: keyWithPath })
  //const src = await getSignedUrl(s3, command, { expiresIn: 3600 })
  //return NextResponse.json({ src })

  const response = await s3.send(command)
  if (!response.Body) throw new Error(`Error downloading files`)

  return new Response(response.Body.transformToWebStream(), {
    headers: { 'content-type': response.ContentType || 'any/*' },
  })
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { workspaceId: string; key: string } }
) {
  console.log(params)
  const { workspaceId, key } = params

  const { sessionId, orgId, userId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  const org = await getOrganizationIdById(orgId != null ? orgId : userId)
  const wrk = await getWorkspaceById(org.id, workspaceId)
  if (!wrk) {
    return NextResponse.json({ error: 'Workspace not found' }, { status: 404 })
  }

  const keyWithPath = `${wrk.id}/${key}`

  const command = new DeleteObjectCommand({ Bucket, Key: keyWithPath })
  //const src = await getSignedUrl(s3, command, { expiresIn: 3600 })
  //return NextResponse.json({ src })

  const response = await s3.send(command)

  console.log('key', keyWithPath)
  console.log('response', response)

  return NextResponse.json({ success: true })
}
