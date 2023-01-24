// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.service.ts', '**/common/helpers/*.{ts,js}', '**/*.resolver.ts'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@Common/(.*)': '<rootDir>/src/common/$1',
    '@Config/(.*)': '<rootDir>/src/config/$1',
    '@Auth/(.*)': '<rootDir>/src/auth/$1',
    '@Authors/(.*)': '<rootDir>/src/author/$1',
    '@ToDos/(.*)': '<rootDir>/src/to-dos/$1',
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
