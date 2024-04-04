require("dotenv").config({ path: "test/.env.test" });

module.exports = {
  displayName: "unit",
  testMatch: ["**/test/unit/*.test.ts"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
};
