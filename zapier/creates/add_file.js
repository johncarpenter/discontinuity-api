const FormData = require("form-data");
const http = require("https");

// Getting a stream directly from http. This only works on core 10+. For core
// 9.x compatible code, see uploadFile_v9.js.
const makeDownloadStream = (url) =>
  new Promise((resolve, reject) => {
    http
      .request(url, (res) => {
        // We can risk missing the first n bytes if we don't pause!
        res.pause();
        resolve(res);
      })
      .on("error", reject)
      .end();
  });

// create a particular add_file by name
const perform = async (z, bundle) => {
  const stream = await makeDownloadStream(bundle.inputData.file, z);

  const form = new FormData();
  form.append("file", stream);

  // All set! Resume the stream
  stream.resume();

  const options = {
    url: "https://api.discontinuity.ai/workspace/file",
    method: "POST",
    headers: {
      Authorization: `Bearer ${bundle.authData.sessionKey}`,
    },
    body: form,
  };

  if (bundle.inputData.filename) {
    options.url = options.url + "?filename=" + bundle.inputData.filename;
  }

  return z.request(options).then((response) => {
    if (response.status === 401 || response.status === 403) {
      throw new z.errors.RefreshAuthError();
    }
    response.throwForStatus();
    return { message: "File uploaded successfully" };
  });
};

module.exports = {
  // see here for a full list of available properties:
  // https://github.com/zapier/zapier-platform/blob/main/packages/schema/docs/build/schema.md#createschema
  key: "add_file",
  noun: "file",

  display: {
    label: "Add a File",
    description: "Uploads a file to your workspace",
  },

  operation: {
    perform,

    // `inputFields` defines the fields a user could provide
    // Zapier will pass them in as `bundle.inputData` later. They're optional.
    // End-users will map data into these fields. In general, they should have any fields that the API can accept. Be sure to accurately mark which fields are required!
    inputFields: [
      { key: "file", required: true, type: "file", label: "File" },
      {
        key: "filename",
        label: "Filename",
        helpText:
          "Optional filename, will help identify the document in the workspace.",
        type: "string",
        required: false,
        altersDynamicFields: false,
      },
    ],

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    sample: {
      id: 1,
      file: "SAMPLE FILE",
    },
  },
};
