module.exports = {
  parser: "@babel/eslint-parser",
  extends: [],
  rules: {
    "import/no-unresolved": "off",
  },
  overrides: [
    {
      files: ["*.test.*"],
      rules: {},
    },
  ],
};
