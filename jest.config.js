// jest.config.js
// Uses Next.js's official Jest helper which wires up SWC, CSS modules, image
// imports, and the @/ alias automatically (so we don't need moduleNameMapper).
const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/e2e/',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/index.{js,jsx}',
    '!src/app/**/layout.js',
    '!src/app/**/loading.js',
    '!src/app/**/error.js',
    '!src/app/**/not-found.js',
    '!src/components/backgrounds/**',
  ],
  // Coverage floor — protects against regressions in the parts that
  // ARE tested. Raise these numbers as more tests are added; never
  // lower them. Targets a per-file threshold for files we explicitly
  // cover, plus a low global floor that current coverage already clears.
  coverageThreshold: {
    global: { branches: 1, functions: 1, lines: 1, statements: 1 },
    'src/hooks/useMessage.js': { lines: 100 },
    'src/components/sections/FAQAccordion.js': { lines: 100 },
    'src/app/api/auth/login/route.js': { lines: 90 },
    'src/app/api/auth/validate/route.js': { lines: 90 },
    'src/app/api/auth/logout/route.js': { lines: 80 },
  },
};

module.exports = createJestConfig(customJestConfig);
