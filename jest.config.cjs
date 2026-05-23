/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Use ts-jest's ESM preset so Jest can execute TypeScript files that use
  // ES module syntax (import/export) without a separate compile step
  preset: 'ts-jest/presets/default-esm',

  // Run tests in a Node.js environment (as opposed to jsdom, which simulates a browser)
  testEnvironment: 'node',

  // Tell Jest to treat .ts files as ESM — required because the project uses "type": "module"
  // in package.json, meaning all .js/.ts files are ES modules by default
  extensionsToTreatAsEsm: ['.ts'],

  // TypeScript imports use .js extensions (e.g. import './foo.js') even for .ts source files —
  // this is required by the ESM spec. This mapper strips the .js so Jest resolves the .ts file instead.
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  // Pipe all .ts/.tsx files through ts-jest with ESM mode enabled
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },

  // Run this file before each test suite (after the test framework is installed).
  // It opens the TypeORM DB connection once so individual spec files don't need
  // to manage it themselves — avoids re-initialization errors across suites.
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],

  // Exclude node_modules (standard) and the setup file itself — setup.ts contains
  // only beforeAll hooks, not tests, so Jest would fail it for having no test cases
  testPathIgnorePatterns: ['/node_modules/', '/src/tests/setup.ts'],
};
