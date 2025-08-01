module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/app/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: [
    "<rootDir>/app/**/__tests__/**/*.[jt]s?(x)",
    "<rootDir>/app/**/*.(test|spec).[jt]s?(x)",
  ],
  collectCoverageFrom: [
    "app/**/*.[jt]s?(x)",
    "!app/**/*.d.ts",
    "!app/**/index.[jt]s?(x)",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
};
