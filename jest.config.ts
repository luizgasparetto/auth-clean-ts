export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: ["text-summary", "lcov"],
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts"],
  transform: { '.+\\.ts$': 'ts-jest' },
};
