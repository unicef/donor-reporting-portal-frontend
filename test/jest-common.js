const path = require('path');

module.exports = {
    rootDir: path.join(__dirname, '..'),
    moduleFileExtensions: ['js', 'ts', 'tsx', 'jsx', 'node'],
    moduleDirectories: ['node_modules'],
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}'
    ],
    testEnvironment: 'jsdom',
    setupFiles: ['<rootDir>/src/setupTests.js'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTestsAfterEnv.js'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx|cjs|mjs)$': '<rootDir>/node_modules/babel-jest',
        '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
        '^(?!.*\\.(js|jsx|ts|tsx|cjs|mjs|css|json)$)': '<rootDir>/config/jest/fileTransform.js'
    },
    modulePaths: ['<rootDir>/src/'],
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx|cjs|mjs)$'],
    testPathIgnorePatterns: ['[/\\\\]fixtures[/\\\\].+\\.(js|jsx|ts|tsx)$']
};
