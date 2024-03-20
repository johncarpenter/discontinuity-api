import * as fs from "fs";
import { S3, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { FaissStore } from "langchain/vectorstores/faiss";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import path from "path";
const s3Client = new S3();

const bucketName = process.env.BUCKET_NAME;

export async function getVectorStore() {
  // Initially we are going to start with a simple FAISS index.
  // The index will be persisted in the embedding director within the s3 bucket

  // Create a directory in /tmp to store the embeddings files
  const embeddingsDir = "/tmp/embeddings";
  if (!fs.existsSync(embeddingsDir)) {
    fs.mkdirSync(embeddingsDir);
  }

  // these are the files we're looking for
  const fileKeys = ["faiss.index", "docstore.json"];

  // download the files from S3
  for (const key of fileKeys) {
    const getObjectCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: `embeddings/${key}`,
    });

    const objectData = await s3Client.send(getObjectCommand);
    const writeStream = fs.createWriteStream(`${embeddingsDir}/${key}`);

    if (objectData.Body !== undefined) {
      await new Promise((resolve, reject) => {
        (objectData.Body as NodeJS.ReadableStream)
          .pipe(writeStream)
          .on("finish", resolve)
          .on("error", reject);
      });
    }
  }

  const vectorStore = await FaissStore.load(
    embeddingsDir,
    await getEmbeddings()
  );

  return vectorStore;
}

/**
 * Only required for FAISS models the others as it syncs the files from s3 to local
 * @param vectorStore
 */
export async function persistVectorStore(vectorStore: FaissStore) {
  const tempPath = "/tmp/embeddings";
  await vectorStore.save(tempPath);

  // Upload each file in the /tmp/embeddings directory to the embeddings directory in S3
  const files = fs.readdirSync(tempPath);
  for (const file of files) {
    const filePath = path.join(tempPath, file);
    const fileBuffer = fs.readFileSync(filePath);
    const s3Key = `embeddings/${file}`;

    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: s3Key,
      Body: fileBuffer,
    });
    await s3Client.send(putCommand);
  }
}

export async function getEmbeddings() {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  if (!openaiApiKey) {
    throw new Error("OPENAI_API_KEY environment variable is not defined.");
  }

  const openaiEmbeddings = new OpenAIEmbeddings({ openAIApiKey: openaiApiKey });
  return openaiEmbeddings;
}
