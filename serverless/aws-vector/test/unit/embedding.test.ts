import { S3Event } from "aws-lambda";
import { handler } from "../../src/embedding";

describe("Embeddings are created when new files are added to s3", () => {
  it("When a file is added to s3 it calculates the embedding", async () => {
    // Call the handler function
    const result = await handler(event);

    // Assert the expected result
    // Add your assertions here
  }, 30000);
});

const event: S3Event = {
  Records: [
    {
      eventVersion: "2.0",
      eventSource: "aws:s3",
      awsRegion: "us-east-1",
      eventTime: "1970-01-01T00:00:00.000Z",
      eventName: "ObjectCreated:Put",
      userIdentity: {
        principalId: "EXAMPLE",
      },
      requestParameters: {
        sourceIPAddress: "127.0.0.1",
      },
      responseElements: {
        "x-amz-request-id": "EXAMPLE123456789",
        "x-amz-id-2":
          "EXAMPLE123/5678abcdefghijklambdaisawesome/mnopqrstuvwxyzABCDEFGH",
      },
      s3: {
        s3SchemaVersion: "1.0",
        configurationId: "testConfigRule",
        bucket: {
          name: "discontinuity-rag-serverless-dev",
          ownerIdentity: {
            principalId: "EXAMPLE",
          },
          arn: "discontinuity-rag-serverless-dev",
        },
        object: {
          key: "test/test.pdf",
          size: 1024,
          eTag: "0123456789abcdef0123456789abcdef",
          sequencer: "0A1B2C3D4E5F678901",
        },
      },
    },
  ],
};
