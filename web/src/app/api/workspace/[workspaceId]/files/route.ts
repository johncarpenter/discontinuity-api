// app/api/documents/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { S3Client, ListObjectsCommand, PutObjectCommand } from '@aws-sdk/client-s3'

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

  const { sessionId, orgId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  if (orgId === null || orgId === undefined) {
    return NextResponse.json({}, { status: 401 })
  }

  const response = await s3.send(new ListObjectsCommand({ Bucket, Prefix: workspaceId }))

  if (!response?.Contents) throw new Error(`Error accessing secure files`)

  const files = response?.Contents?.filter((file: any) => file.Key !== `${workspaceId}/`).map(
    (file: any) => {
      file.Key = file.Key?.replace(`${workspaceId}/`, '')
      return {
        ...file,
      }
    }
  )

  return NextResponse.json(files ?? [])
}

export async function POST(request: NextRequest, { params }: { params: { workspaceId: string } }) {
  const { workspaceId } = params

  const { sessionId, orgId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  if (orgId === null || orgId === undefined) {
    return NextResponse.json({}, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const files = formData.getAll('file') as File[]
    const response = await Promise.all(
      files.map(async (file) => {
        // not sure why I have to override the types here
        const Body = (await file.arrayBuffer()) as Buffer
        s3.send(new PutObjectCommand({ Bucket, Key: `${workspaceId}/${file.name}`, Body }))
      })
    )
    return NextResponse.json(response)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Unable to load files' }, { status: 500 })
  }
}
