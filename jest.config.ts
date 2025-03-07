// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
	// Use 'ts-jest' to transform TypeScript test files
	preset: 'ts-jest',

	// If you are testing React, setting the environment to jsdom is crucial
	testEnvironment: 'jsdom',

	// Instruct Jest to look for test files in certain directories/formats
	testMatch: [
		'**/__tests__/**/*.+(ts|tsx|js)',
		'**/?(*.)+(spec|test).+(ts|tsx|js)',
	],

	// Optionally configure how Jest will handle modules
	moduleNameMapper: {
		// Mock out CSS and image imports to prevent errors
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.ts',
		// Alias resolution (mirroring `vite.config.ts` if you’re using path aliases)
		'^@/(.*)$': '<rootDir>/src/$1',
	},

	// Collect coverage from relevant files
	collectCoverageFrom: [
		'src/**/*.{ts,tsx}',
		'!src/**/*.d.ts',
		'!src/index.tsx', // optionally exclude entry point
	],
	coverageDirectory: 'coverage',
	coverageReporters: ['html', 'text', 'lcov'],

	// Setup files to run before tests (e.g. adding jest-dom matchers)
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.test.json',
		},
	},
};

export default config;
