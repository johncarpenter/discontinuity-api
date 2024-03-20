import { handler } from "../../src/embedding";

describe("Embeddings are created when new files are added to s3", () => {
  it("When a file is added to s3 it calculates the embedding", async () => {
    // Mock the event object
    const event = {
      // Provide necessary properties for the event
    };

    // Call the handler function
    const result = await handler(event);

    // Assert the expected result
    // Add your assertions here
  });

  it("When a pdf file is added, it is correctly parsed", async () => {
    // Mock the event object
    const event = {
      // Provide necessary properties for the event
    };

    // Call the handler function
    const result = await handler(event);

    // Assert the expected result
    // Add your assertions here
  });
});
