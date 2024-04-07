const should = require("should");

const zapier = require("zapier-platform-core");

const App = require("../index");
const appTester = zapier.createAppTester(App);

describe("Testing session authentication", () => {
  zapier.tools.env.inject();

  it("should authenticate", async () => {
    const bundle = {
      authData: {
        client_secret: process.env.CLIENT_SECRET,
        client_id: process.env.CLIENT_ID,
      },
    };

    const results = await appTester(
      App.authentication.sessionConfig.perform,
      bundle
    );

    should.exist(results);
    should.exist(results.sessionKey);
  });
});
