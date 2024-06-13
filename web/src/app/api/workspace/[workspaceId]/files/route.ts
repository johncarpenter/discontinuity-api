// app/api/documents/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { S3Client } from '@aws-sdk/client-s3'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { getOrganizationIdById } from '@/prisma/services/organization'
import { getWorkspaceById } from '@/prisma/services/workspace'
import { FileStatusType } from '@prisma/client'
import { getFilesForWorkspace, upsertFileStatus } from '@/prisma/services/files'

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
})

const Bucket = `${process.env.AWS_BUCKET_NAME as string}`

// endpoint to get the list of files in the bucket
export async function GET(req: NextRequest, { params }: { params: { workspaceId: string } }) {
  const { workspaceId } = params

  const { sessionId, orgId, userId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  const org = await getOrganizationIdById(orgId != null ? orgId : userId)
  const wrk = await getWorkspaceById(org.id, workspaceId)
  if (!wrk) {
    return NextResponse.json({ error: 'Workspace not found' }, { status: 404 })
  }

  // const response = await s3.send(new ListObjectsCommand({ Bucket, Prefix: workspaceId }))

  // if (!response?.Contents) {
  //   return NextResponse.json([])
  // }

  // const files = response?.Contents?.filter((file: any) => file.Key !== `${wrk.id}/`).map(
  //   (file: any) => {
  //     file.Key = file.Key?.replace(`${wrk.id}/`, '')
  //     return {
  //       ...file,
  //     }
  //   }
  // )

  const files = await getFilesForWorkspace(wrk.id)

  return NextResponse.json(files ?? [])
}

/**
 * Vercel doesn't allow file uploads, so we are routing this to the
 * @param request
 * @param param1
 * @returns
 */
export async function POST(request: NextRequest, { params }: { params: { workspaceId: string } }) {
  const { workspaceId } = params
  const { filename, contentType } = await request.json()

  const { sessionId, orgId, userId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  const org = await getOrganizationIdById(orgId != null ? orgId : userId)
  const wrk = await getWorkspaceById(org.id, workspaceId)
  if (!wrk) {
    return NextResponse.json({ error: 'Workspace not found' }, { status: 404 })
  }

  try {
    // Update the record in the db
    await upsertFileStatus(workspaceId, filename, FileStatusType.PROCESSING)

    const { url, fields } = await createPresignedPost(s3, {
      Bucket,
      Key: `${wrk.id}/${filename}`,
      Conditions: [
        ['content-length-range', 0, 10485760], // up to 10 MB
        ['starts-with', '$Content-Type', contentType],
      ],
      Fields: {
        'Content-Type': contentType,
      },
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    })

    return Response.json({ url, fields })
  } catch (error) {
    console.log('Problem generating presigned:', error)
    return Response.json({ error: 'Unable to upload file' })
  }
}

// try {
//   const formData = await request.formData()
//   const files = formData.getAll('file') as File[]
//   const response = await Promise.all(
//     files.map(async (file) => {
//       // not sure why I have to override the types here
//       const Body = (await file.arrayBuffer()) as Buffer
//       s3.send(new PutObjectCommand({ Bucket, Key: `${workspaceId}/${file.name}`, Body }))
//     })
//   )
//   return NextResponse.json(response)
// } catch (error) {
//   console.log(error)
//   return NextResponse.json({ message: 'Unable to load files' }, { status: 500 })
// }
