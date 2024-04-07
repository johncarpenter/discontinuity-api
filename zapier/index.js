const authentication = require("./authentication");
const addDocumentCreate = require("./creates/add_document.js");

const createAddFile = require("./creates/add_file");

const includeAccessToken = (req, z, bundle) => {
  if (!req.url.includes("auth/token")) {
    if (process.env.NODE_ENV !== "production") {
      console.log("including access token");
      console.log("bundle", bundle);
    }

    if (bundle.authData && bundle.authData.sessionKey) {
      req.headers.Authorization = `Bearer ${bundle.authData.sessionKey}`;
    }
  }
  return req;
};

module.exports = {
  version: require("./package.json").version,
  platformVersion: require("zapier-platform-core").version,
  creates: {
    [addDocumentCreate.key]: addDocumentCreate,
    [createAddFile.key]: createAddFile,
    [createAddFile.key]: createAddFile,
  },
  authentication: authentication,

  beforeRequest: [includeAccessToken],

  triggers: {},
};
