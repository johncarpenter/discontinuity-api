const test = async (z, bundle) => {
  const options = {
    url: "https://api.discontinuity.ai/auth/me",
    method: "GET",
    headers: {
      Authorization: `Bearer ${bundle.authData.sessionKey}`,
    },
    params: {},
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });
};

const perform = async (z, bundle) => {
  if (process.env.NODE_ENV !== "production") {
    console.log("starting auth perform");
    console.log("bundle", bundle);
  }

  const options = {
    url: "https://api.discontinuity.ai/auth/token",
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    params: {},
    body: {
      client_id: bundle.authData.client_id,
      client_secret: bundle.authData.client_secret,
    },
  };

  return z.request(options).then((response) => {
    if (process.env.NODE_ENV !== "production") {
      console.log("auth response", response);
    }
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return {
      sessionKey: results.access_token,
    };
  });
};

module.exports = {
  type: "session",
  test: test,
  fields: [
    { computed: false, key: "client_id", required: true, label: "Client ID" },
    {
      computed: false,
      key: "client_secret",
      required: true,
      label: "Client Secret",
    },
  ],
  sessionConfig: { perform: perform },
};
