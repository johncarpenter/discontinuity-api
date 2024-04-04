import { S3, PutObjectCommand } from "@aws-sdk/client-s3";

const { S3_AWS_SECRET_KEY, S3_AWS_ACCESS_KEY } = process.env;

const s3 = new S3({
  credentials: {
    accessKeyId: S3_AWS_ACCESS_KEY || "",
    secretAccessKey: S3_AWS_SECRET_KEY || "",
  },
  region: "us-west-2",
});

// 1. upload a file
async function uploadFile(bucket: string, key: string, file: string) {
  const putObjectCommand = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
  });
}
