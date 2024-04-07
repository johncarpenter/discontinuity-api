const zapier = require("zapier-platform-core");

// Use this to make test calls into your app:
const App = require("../../index");
const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe("creates.add_document", () => {
  it("should run", async () => {
    const bundle = {
      inputData: {
        content: "Hello, World!",
        filename: "test.txt",
        metadata: {
          key: "value",
        },
      },
    };

    const results = await appTester(
      App.creates["add_document"].operation.perform,
      bundle
    );
    expect(results).toBeDefined();
    expect(results.content).toContain("File uploaded successfully");
  }, 30000);
});
