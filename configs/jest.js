module.exports = {
  coveragePathIgnorePatterns: [
    'test.ts',
    // Annoying to test
    'cli/src/hooks',
    // Impossible to test
    'cli/src/middleware/checkNodeRequirement.ts',
    'cli/src/LogWriter.tsx',
    'cli/src/Wrapper.tsx',
    // Not supported by Jest/Babel
    'config/src/loaders/mjs.ts',
    'config/src/loaders/supports',
    'decorators/src/helpers/isParam.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 99,
      lines: 99,
      statements: 99,
    },
  },
  transformIgnorePatterns: [
    // For testing `requireTypedModule`
    'common/tests/helpers/__fixtures__',
  ],
};
