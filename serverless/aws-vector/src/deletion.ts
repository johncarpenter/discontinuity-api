import { S3Event } from "aws-lambda";
import { getPostgresVectorStore } from "./utils";

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

  try {
    const filter = {
      filter: {
        scope: bucket,
        file: file,
      },
    };

    const vectorstore = await getPostgresVectorStore(folder);
    await vectorstore.delete(filter);

    console.log(`File ${file} removed from index`);
  } catch (error) {
    console.error(error);
  }
}
