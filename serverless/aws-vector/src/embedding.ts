import { S3Event } from "aws-lambda";
import * as AWS from "aws-sdk";
import { RecursiveCharacterTextSplitter } from "langchain/dist/text_splitter";
import { S3Loader } from "langchain/document_loaders/web/s3";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { get } from "http";
import { getVectorStore, persistVectorStore } from "./utils";

const s3 = new AWS.S3();

const {
  OPENAI_API_KEY,
  AWS_SECRET_KEY,
  AWS_ACCESS_KEY,
  UNSTRUCTURED_URL,
  UNSTRUCTURED_API_KEY,
} = process.env;
/**
 * Triggered when an AWS Object is uploaded to the S3 bucket (specified in the serverless.yml file)
 * The document is then extracted and the embedding vector is calculated and stored in the database
 *
 *
 * @param event
 */
export async function handler(event: S3Event) {
  // Extract the document from the S3 object
  const documents = await extractDocuments(event);

  // Split the document into smaller chunks
  const chunks = await splitDocuments(documents);

  // Calculate the embedding vector
  await calculateEmbedding(chunks);
}

async function extractDocuments(event: S3Event) {
  // Retrieve the bucket & key for the uploaded S3 object that
  // caused this Lambda function to be triggered
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );

  const loader = new S3Loader({
    bucket: bucket,
    key: key,
    s3Config: {
      region: "us-east-1",
      credentials: {
        accessKeyId: AWS_ACCESS_KEY || "",
        secretAccessKey: AWS_SECRET_KEY || "",
      },
    },
    unstructuredAPIURL: UNSTRUCTURED_URL || "",
    unstructuredAPIKey: UNSTRUCTURED_API_KEY || "", // this will be soon required
  });

  const docs = await loader.load();

  return docs;
}

async function splitDocuments(documents: Document<Record<string, any>>[]) {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 10,
  });

  return await textSplitter.splitDocuments(documents);
}

async function calculateEmbedding(documents: Document<Record<string, any>>[]) {
  const vectorstore = await getVectorStore();

  await vectorstore.addDocuments(documents);

  await persistVectorStore(vectorstore);
}
