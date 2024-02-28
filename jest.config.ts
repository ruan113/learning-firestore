export default {
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/test/_config/jest-setup.ts'],
  testMatch: ['**/test/**/*.(spec|test|acceptance).ts'],
  collectCoverage: true,
  moduleNameMapper: {
    '@/test/(.*)': '<rootDir>/test/$1',
    '@/(.*)': '<rootDir>/src/$1',
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
