/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "@jest/types";
const config: Config.InitialOptions = {
  setupFiles: ["dotenv/config"],
  projects: ["<rootDir>/jest.unit.config.ts"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  verbose: true,
  testMatch: ["**/tests/**/*.test.ts"],
  moduleNameMapper: {
    "fs/promises": "<rootDir>/node_modules/fs-extra/lib/fs",
  },
};

export default config;
