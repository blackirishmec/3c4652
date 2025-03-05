const path = require('path');

module.exports = {
	// root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: { jsx: true },
		ecmaVersion: 2023,
		sourceType: 'module',
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	env: {
		browser: true,
		es2023: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
	],
	ignorePatterns: [
		'dist',
		'.eslintrc.cjs',
		'!*.js',
		'.*.js',
		'*.json',
		'*.js.map',
	],
	plugins: ['@typescript-eslint', 'react-refresh', 'import'],
	overrides: [
		{
			files: ['*.ts', '*.tsx', '*.d.ts'],
			parserOptions: {
				project: './tsconfig.json',
			},
		},
	],
	rules: {
		'no-console': 'warn',
		'no-debugger': 'warn',
		'no-warning-comments': ['warn', { terms: ['!', 'any other term'] }],
		'object-shorthand': 'error',
		'no-param-reassign': [
			'error',
			{
				props: false,
			},
		],

		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': ['error'],

		'no-use-before-define': 'off',
		'@typescript-eslint/no-use-before-define': [
			'error',
			{ functions: false, variables: false },
		],

		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
		],

		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-unnecessary-type-assertion': 'error',
		'@typescript-eslint/no-floating-promises': [
			'error',
			{ ignoreVoid: true },
		],
		'@typescript-eslint/strict-boolean-expressions': 'warn',
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{
				prefer: 'type-imports',
				fixStyle: 'separate-type-imports',
			},
		],
		'@typescript-eslint/ban-ts-comment': 'warn',
		'@typescript-eslint/ban-types': 'off',

		// 'import/no-cycle': ['error', { maxDepth: 3 }],
		'import/no-unresolved': 'error',
		'import/order': [
			'error',
			{
				alphabetize: { order: 'asc', caseInsensitive: true },
				groups: [
					'external',
					'type',
					'internal',
					'builtin',
					['parent', 'sibling', 'index'],
					'unknown',
				],
				pathGroups: [
					{
						pattern: '@(react|react-dom/**)',
						group: 'external',
						position: 'before',
					},
					{
						pattern: '@(@xyflow/**)',
						group: 'external',
						position: 'before',
					},
					{
						pattern: '@/**',
						group: 'type',
						position: 'after',
					},
				],
				'newlines-between': 'always',
				pathGroupsExcludedImportTypes: ['builtin', 'type'],
				named: true,
			},
		],
		'import/extensions': [
			'error',
			'never',
			{
				css: 'always',
				scss: 'always',
				sass: 'always',
			},
		],
		'import/no-default-export': 'off',
		'import/no-extraneous-dependencies': ['error'],

		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',

		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
	},
	settings: {
		ecmaVersion: 'latest',
		react: {
			version: 'detect',
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
			typescript: {
				project: './tsconfig.json',
				alwaysTryTypes: true,
			},
			alias: {
				map: [['@/', path.resolve(__dirname, './src')]],
				extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx'],
			},
		},
	},
};
