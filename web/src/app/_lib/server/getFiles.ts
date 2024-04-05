import AIFile from '@/app/types/AIFile'
import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3'

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
})

const Bucket = `${process.env.AWS_BUCKET_NAME as string}`

// endpoint to get the list of files in the bucket
export async function getFiles({ workspaceId }: { workspaceId: string }): Promise<AIFile[]> {
  const response = await s3.send(
    new ListObjectsCommand({ Bucket, Prefix: `${workspaceId}/`, Delimiter: '/' })
  )
  if (!response?.Contents) return []

  const files = response?.Contents?.filter((file: any) => file.Key !== `${workspaceId}/`).map(
    (file: any) => {
      file.Key = file.Key?.replace(`${workspaceId}/`, '')
      return {
        name: file.Key,
        size: file.Size,
        updatedAt: file.LastModified,
      }
    }
  )

  return files ?? []
}
