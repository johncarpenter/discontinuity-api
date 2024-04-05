import * as fs from "fs";
import { S3, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings } from "@langchain/openai";

import path from "path";
const s3Client = new S3();

import {
  PGVectorStore,
  DistanceStrategy,
} from "@langchain/community/vectorstores/pgvector";
import { PoolConfig } from "pg";

export async function getFaissVectorStore(bucketName: string) {
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
export async function persistVectorStore(
  vectorStore: FaissStore,
  bucketName: string
) {
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
  //return new GoogleVertexAIMultimodalEmbeddings();
}

export async function getPostgresVectorStore(tableName: string) {
  const config = {
    postgresConnectionOptions: {
      connectionString: process.env.DATABASE_URL || "",
    } as PoolConfig,
    tableName: tableName || "documents",
    columns: {
      idColumnName: "id",
      vectorColumnName: "embedding",
      contentColumnName: "pageContent",
      metadataColumnName: "metadata",
    },
    // supported distance strategies: cosine (default), innerProduct, or euclidean
    distanceStrategy: "cosine" as DistanceStrategy,
  };

  const pgstore = await PGVectorStore.initialize(await getEmbeddings(), config);

  return pgstore;
}
