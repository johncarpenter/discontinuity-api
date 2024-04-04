import { S3Event } from "aws-lambda";
import { S3Loader } from "langchain/document_loaders/web/s3";
import { Document } from "langchain/document";
import { getPostgresVectorStore } from "./utils";
import { S3, GetObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import { UnstructuredLoader } from "langchain/document_loaders/fs/unstructured";

const {
  S3_AWS_SECRET_KEY,
  S3_AWS_ACCESS_KEY,
  UNSTRUCTURED_URL,
  UNSTRUCTURED_API_KEY,
} = process.env;

const s3 = new S3({
  credentials: {
    accessKeyId: S3_AWS_ACCESS_KEY || "",
    secretAccessKey: S3_AWS_SECRET_KEY || "",
  },
  region: "us-west-2",
});

const unstructuredFileTypes = [
  "eml",
  "html",
  "json",
  "md",
  "msg",
  "rst",
  "rtf",
  "txt",
  "xml",
  "csv",
  "doc",
  "docx",
  "epub",
  "odt",
  "pdf",
  "ppt",
  "pptx",
  "tsv",
  "xlsx",
  "jpg",
  "jpeg",
  "png",
  "gif",
  "tiff",
  "bmp",
  "heic",
];

const mediaFileTypes = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "tiff",
  "bmp",
  "heic",
  "webp",
];

/**
 * Triggered when an AWS Object is uploaded to the S3 bucket (specified in the serverless.yml file)
 * The document is then extracted and the embedding vector is calculated and stored in the database
 *
 *
 * @param event
 */
export async function handler(event: S3Event) {
  console.log("Processing event", JSON.stringify(event, null, 2));

  // Get the bucket name, key and folder from the event
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );
  const folder = key.split("/")[0];
  const file = key.split("/").pop() || "";

  const ext = file.split(".").pop() || "";

  let documents: Document<Record<string, any>>[] = [];

  if (unstructuredFileTypes.includes(ext.toLowerCase())) {
    console.log("Processing with unstructured API");
    // Extract the document from the S3 object using unstructured API
    documents = await extractDocumentsUsingUnstructured(bucket, key);
    //} else if (mediaFileTypes.includes(ext.toLowerCase())) {
    // use multimodal embeddings
    //  documents = await extractDocumentsFromImages(bucket, key, ext);
  } else {
    console.error(`Unsupported file type: ${ext}`);
    return;
  }

  console.log(`file: ${file} folder: ${folder} bucket: ${bucket} ext: ${ext}`);

  // Append metadata
  appendMetadata(documents, bucket, file, key);

  // Calculate the embedding vector
  await calculateEmbedding(folder, documents);

  console.log("Embedding calculated for file");
}

async function extractDocumentsFromImages(
  bucket: string,
  key: string,
  type: string
): Promise<Document<Record<string, any>>[]> {
  const getObjectCommand = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  const data = await s3.send(getObjectCommand).then((data) => {
    const base64String = data?.Body?.transformToString("base64") || "";
    let src = `data:image/${type};base64,${base64String}`;

    const document = new Document({
      pageContent: src,
      // Metadata is optional but helps track what kind of document is being retrieved
      metadata: {
        mediaType: "image",
      },
    });
    return [document];
  });

  console.log("Image Downloaded.");
  // convert to base64
  return [];
}

async function extractDocumentsUsingUnstructured(bucket: string, key: string) {
  // Retrieve the bucket & key for the uploaded S3 object that
  // caused this Lambda function to be triggered
  const getObjectCommand = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  const options = {
    apiUrl: UNSTRUCTURED_URL || "",
    apiKey: UNSTRUCTURED_API_KEY || "",
  };

  const file = key.split("/").pop();

  // download the file to a local temp file
  const objectData = await s3.send(getObjectCommand);
  const writeStream = fs.createWriteStream(`/tmp/${file}`);

  if (objectData.Body !== undefined) {
    await new Promise((resolve, reject) => {
      (objectData.Body as NodeJS.ReadableStream)
        .pipe(writeStream)
        .on("finish", resolve)
        .on("error", reject);
    });
  }

  const loader = new UnstructuredLoader(`/tmp/${file}`, options);

  const docs = await loader.load();
  return docs;
}

function appendMetadata(
  documents: Document<Record<string, any>>[],
  bucket: string,
  file: string,
  key: string
) {
  documents.forEach((doc) => {
    doc.metadata = {
      ...doc.metadata,
      // Add any additional metadata here
      file: file,
      scope: bucket,
      uri: "s3://" + bucket + "/" + key,
    };
  });
}

async function calculateEmbedding(
  folder: string,
  documents: Document<Record<string, any>>[]
) {
  const vectorstore = await getPostgresVectorStore(folder);

  await vectorstore.addDocuments(documents);
}
