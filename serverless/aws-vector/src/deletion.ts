import { S3Event } from "aws-lambda";
import { getQdrantClient, getQdrantVectorStore } from "./utils";
import { archiveFile, getFileID, getFirstOpenAIKey } from "./db";
import OpenAI from "openai";

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

  await archiveFile(folder, file);

  if (dataFileTypes.includes(ext)) {
    const openaikey = await getFirstOpenAIKey(folder);
    if (openaikey) {
      console.log("Deleting file from OpenAI Assistant:", file);
      const id = await getFileID(folder, file);
      if (id) {
        const openai = new OpenAI({ apiKey: openaikey });
        await openai.files.del(id);
      }
    }
  }

  try {
    const filter = {
      filter: {
        scope: bucket,
        file: file,
      },
    };

    const client = getQdrantClient(folder);

    const records = await client.scroll(folder, {
      filter: {
        must: [{ key: "metadata.file", match: { value: file } }],
      },
    });

    const pointIds = records.points.map((record) => record.id);

    console.log("Deleting record", JSON.stringify(pointIds));

    const del = await client.delete(folder, {
      points: pointIds,
    });

    console.log(`File ${file} removed from index`);
  } catch (error) {
    console.error(error);
  }
}
