import { S3Event } from "aws-lambda";
import path from "path";
import {
  extractDocumentsUsingUnstructured,
  extractDocumentsFromImages,
  handler,
} from "../../src/embedding";
import exp from "constants";
import { getQdrantClient } from "../../src/utils";
import { assert } from "console";

describe("Embeddings are removed when file is deleted from s3", () => {
  it("Can delete a record from qdrant", async () => {
    const key =
      "clumutd7f0002tsdezd06430g/johncarpenter_a_vector_illustration_logo._The_logo_is_for_a_pro_ac5035d1-fee3-40d2-90a1-426a85f5c6fb.png";

    const folder = key.split("/")[0];
    const file = key.split("/").pop() || "";

    const ext = file.split(".").pop() || "";

    const client = getQdrantClient(folder);

    console.log(
      "Retrieving record",
      JSON.stringify({
        folder,
        file,
        ext,
      })
    );

    const records = await client.scroll(folder, {
      filter: {
        must: [{ key: "metadata.file", match: { value: file } }],
      },
    });
    console.log(records);

    const pointIds = records.points.map((record) => record.id);

    console.log("Deleting record", JSON.stringify(pointIds));

    const del = await client.delete(folder, {
      points: pointIds,
    });

    console.log(del);
    //assert(records.status == "acknowledged");
  }, 30000);
});
