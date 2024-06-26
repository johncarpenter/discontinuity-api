import { S3Event } from "aws-lambda";
import { Document } from "langchain/document";
import {
  getFaissVectorStore,
  getPostgresVectorStore,
  getQdrantVectorStore,
  persistVectorStore,
} from "./utils";
import { S3, GetObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import { UnstructuredLoader } from "langchain/document_loaders/fs/unstructured";
import OpenAI from "openai";
import {
  RecursiveCharacterTextSplitter,
  TokenTextSplitter,
} from "langchain/text_splitter";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import {
  FileStatusType,
  addFileId,
  getFirstOpenAIKey,
  upsertFileStatus,
} from "./db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

const pdfType = ["pdf"];

const unstructuredFileTypes = [
  "eml",
  "html",
  "md",
  "msg",
  "rst",
  "rtf",
  "txt",
  "doc",
  "docx",
  "epub",
  "odt",
  "pdf",
  "ppt",
  "pptx",
  "xlsx",
];

const imageFileTypes = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "tiff",
  "bmp",
  "heic",
  "webp",
];

const audioFileTypes = ["mp3", "wav", "flac", "ogg", "m4a", "aac"];

const dataFileTypes = ["csv", "tsv", "json", "xml", "xlsx"];

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
  // Extract the folders
  const folder = key.split("/")[0];

  // Extract the file name and extension
  const file = key.split("/").pop() || "";
  const ext = file.split(".").pop() || "";
  try {
    // Update the status of the file to processing
    await upsertFileStatus(folder, file, FileStatusType.PROCESSING);

    let documents: Document<Record<string, any>>[] = [];

    const tmpFile = await downloadS3fileLocally(bucket, key);

    if (pdfType.includes(ext.toLowerCase())) {
      console.log("Processing with embedded pdf");
      // Extract the document from the S3 object using unstructured API
      documents = await extractDocumentsPdf(tmpFile);
    } else if (unstructuredFileTypes.includes(ext.toLowerCase())) {
      console.log("Processing with unstructured API");
      // Extract the document from the S3 object using unstructured API
      documents = await extractDocumentsUsingUnstructured(tmpFile);
    } else if (audioFileTypes.includes(ext.toLowerCase())) {
      documents = await extractDocumentsFromAudio(tmpFile);
    } else if (imageFileTypes.includes(ext.toLowerCase())) {
      documents = await extractDocumentsFromImages(tmpFile);
    } else if (dataFileTypes.includes(ext.toLowerCase())) {
      console.log("Data files are excluded from the embedding process.");
      // upload these to the assistants api
      const openaikey = await getFirstOpenAIKey(folder);
      if (openaikey) {
        // upload the file to the assistants api
        const fileId = await uploadFileToAssistantsApi(tmpFile, openaikey);
        await addFileId(folder, file, fileId);
        upsertFileStatus(folder, file, FileStatusType.INDEXED);
      } else {
        console.error("No OpenAI key found for workspace");
        upsertFileStatus(folder, file, FileStatusType.ERROR);
      }
      return;
    } else {
      console.error(`Unsupported file type: ${ext}`);
      upsertFileStatus(folder, file, FileStatusType.ERROR);
      return;
    }

    // Append metadata
    appendMetadata(documents, bucket, file, key, ext);

    // Split large documents
    documents = await splitLargeDocuments(documents);

    // Calculate the embedding vector
    await calculateEmbeddingQdrant(folder, documents);

    console.log("Embedding calculated for file");
    // Update the status of the file to processing
    upsertFileStatus(folder, file, FileStatusType.INDEXED);
  } catch (error) {
    console.error("Error processing file", error);
    upsertFileStatus(folder, file, FileStatusType.ERROR);
  }
}

async function downloadS3fileLocally(bucket: string, key: string) {
  const getObjectCommand = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  const options = {
    apiUrl: UNSTRUCTURED_URL || "",
    apiKey: UNSTRUCTURED_API_KEY || "",
    strategy: "hi-res",
    chunkingStrategy: "by_title",
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

  return `/tmp/${file}`;
}

/**
 * This function will extract context from the images using CLIP from openai
 * @param tmpfile
 */
async function extractDocumentsFromImages(tmpfile: string) {
  // load image and convert to base64
  const base64_image = fs.readFileSync(tmpfile, { encoding: "base64" });

  const ext = tmpfile.split(".").pop() || "";

  const payload = {
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "What’s in this image?",
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64_image}`,
            },
          },
        ],
      },
    ],
    max_tokens: 300,
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  };

  // call request to openai
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  const transcription = result.choices[0].message.content;

  const document = new Document({
    pageContent: transcription || "Unable to interpret image",
    // Metadata is optional but helps track what kind of document is being retrieved
    metadata: {
      source: "gpt4v",
      mediaType: "image",
      category: "ImageDescription",
    },
  });

  return [document];
}

/**
 * This function will extract context from audio using whisper transcription from openai
 * @param tmpfile
 */
async function extractDocumentsFromAudio(tmpfile: string) {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(tmpfile),
    model: "whisper-1",
  });

  const document = new Document({
    pageContent: transcription.text || "Unable to read audio",
    // Metadata is optional but helps track what kind of document is being retrieved
    metadata: {
      source: "whisper",
      mediaType: "audio",
      category: "Transcription",
    },
  });
  return [document];
}

/**
 * This function will extract context from pdf using unstructured API
 * @param tmpfile
 */
async function extractDocumentsPdf(tmpfile: string) {
  const loader = new PDFLoader(tmpfile);

  const docs = await loader.load();

  docs.forEach((doc) => {
    doc.metadata = {
      ...doc.metadata,
      source: "pdf",
      mediaType: "text",
      category: "NarrativeText",
    };
  });

  return docs;
}

async function extractDocumentsUsingUnstructured(tmpfile: string) {
  const options = {
    apiUrl: UNSTRUCTURED_URL || "",
    apiKey: UNSTRUCTURED_API_KEY || "",
    strategy: "fast",
  };

  const loader = new UnstructuredLoader(tmpfile, options);

  const docs = await loader.load();

  docs.forEach((doc) => {
    doc.metadata = {
      ...doc.metadata,
      source: "unstructured",
      mediaType: "text",
    };
  });

  return docs;
}

function appendMetadata(
  documents: Document<Record<string, any>>[],
  bucket: string,
  file: string,
  key: string,
  ext: string
) {
  documents.forEach((doc) => {
    doc.metadata = {
      ...doc.metadata,
      // Add any additional metadata here
      type: ext,
      file: file,
      scope: bucket,
      uri: "s3://" + bucket + "/" + key,
      date: new Date().toISOString(),
    };
  });
}

async function splitLargeDocuments(documents: Document<Record<string, any>>[]) {
  // const splitter = new RecursiveCharacterTextSplitter({
  //   chunkSize: 1024,
  //   chunkOverlap: 50,
  // });

  const splitter = new TokenTextSplitter({
    encodingName: "gpt2",
    chunkSize: 512,
    chunkOverlap: 50,
  });

  return await splitter.splitDocuments(documents);
}

async function calculateEmbedding(
  folder: string,
  documents: Document<Record<string, any>>[]
) {
  const vectorstore = await getPostgresVectorStore(folder);

  await vectorstore.addDocuments(documents);
}

async function calculateEmbeddingQdrant(
  folder: string,
  documents: Document<Record<string, any>>[]
) {
  const vectorstore = await getQdrantVectorStore(folder);

  await vectorstore.addDocuments(documents);
}

async function calculateEmbeddingFaiss(
  folder: string,
  documents: Document<Record<string, any>>[]
) {
  const vectorstore = await getFaissVectorStore(folder);

  await vectorstore.addDocuments(documents);

  await persistVectorStore(vectorstore, folder);
}

async function uploadFileToAssistantsApi(tmpFile: string, openaikey: any) {
  console.log(
    "Uploading file to OpenAI Assistants API ",
    openaikey?.substring(0, 5),
    " file:",
    tmpFile
  );
  const openai = new OpenAI({ apiKey: openaikey });
  const file = await openai.files.create({
    file: fs.createReadStream(tmpFile),
    purpose: "assistants",
  });
  return file.id;
}

// export for testing
export {
  extractDocumentsUsingUnstructured,
  downloadS3fileLocally,
  extractDocumentsFromAudio,
  extractDocumentsFromImages,
  uploadFileToAssistantsApi,
};
