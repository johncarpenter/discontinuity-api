import * as AWS from "aws-sdk";

const s3 = new AWS.S3();
/**
 * Triggered when an AWS Object is uploaded to the S3 bucket (specified in the serverless.yml file)
 * The document is then extracted and the embedding vector is calculated and stored in the database
 *
 *
 * @param event
 */
export async function hander(event) {
  // Extract the document from the S3 object
  const document = await extractDocument(event);

  // Calculate the embedding vector
  const embedding = await calculateEmbedding(document);

  // Store the embedding in the database
  await storeEmbedding(embedding);
}

function extractDocument(event: any) {
  // Retrieve the bucket & key for the uploaded S3 object that
  // caused this Lambda function to be triggered
  const Bucket = event.Records[0].s3.bucket.name;
  const Key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );

  // Retrieve the object
  s3.getObject({ Bucket, Key }, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      callback(err);
    } else {
      console.log("Raw text:\n" + data.Body.toString("ascii"));
      callback(null, null);
    }
  });
}

function calculateEmbedding(document: any) {
  throw new Error("Function not implemented.");
}

function storeEmbedding(embedding: any) {
  throw new Error("Function not implemented.");
}
