const perform = async (z, bundle) => {
  if (process.env.NODE_ENV !== "production") {
    console.log("starting add_document perform");
    console.log("bundle", bundle);
  }

  const options = {
    url: "https://api.discontinuity.ai/workspace/text",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    params: {},
    body: {
      content: bundle.inputData.content,
      metadata: bundle.inputData.metadata,
      filename: bundle.inputData.filename,
    },
  };

  return z.request(options).then((response) => {
    if (response.status === 401 || response.status === 403) {
      console.log("Token expired, sending new request");
      throw new z.errors.RefreshAuthError();
    }

    response.throwForStatus();
    return { message: "File uploaded successfully" };
  });
};

module.exports = {
  display: {
    description: "Adds a document to your Workspace",
    hidden: false,
    label: "Add Document",
  },
  key: "add_document",
  noun: "document",
  operation: {
    inputFields: [
      {
        key: "content",
        label: "Text Content",
        type: "text",
        helpText: "Place your text here that you would like to index.",
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: "metadata",
        label: "Metadata",
        helpText: "Metadata in key-value pairs",
        dict: true,
        required: false,
        altersDynamicFields: false,
      },
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
    perform: perform,
  },
};
