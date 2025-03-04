module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: { jsx: true },
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	env: { browser: true, es2020: true },
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
	plugins: ['react-refresh', 'import'],
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
						pattern: '@(react|react-native)',
						group: 'external',
						position: 'before',
					},
					{
						pattern: '@reduxjs/**',
						group: 'external',
						position: 'before',
					},
					{
						pattern: 'expo**',
						group: 'external',
						position: 'before',
					},
					{
						pattern: 'react-native',
						group: 'external',
						position: 'before',
					},
					{
						pattern: '@/types/**',
						group: 'type',
						position: 'after',
					},
					{
						pattern: '@/interfaces/**',
						group: 'type',
						position: 'after',
					},
					{
						pattern: '@/enums/**',
						group: 'type',
						position: 'after',
					},
					{
						pattern: '@/models/**',
						group: 'type',
						position: 'after',
					},
					{
						pattern: '@/api/**',
						group: 'type',
						position: 'after',
					},
					{
						pattern: '@/redux/**',
						group: 'type',
						position: 'after',
					},
					{
						pattern: '@/hooks/**',
						group: 'type',
						position: 'after',
					},
					{
						pattern: '@/utilities/**',
						group: 'type',
						position: 'after',
					},
					{
						pattern: '@/functions/**',
						group: 'type',
						position: 'after',
					},
					{
						pattern: '@/components/**',
						group: 'type',
						position: 'after',
					},
					{
						pattern: '@/styles/**',
						group: 'type',
						position: 'after',
					},
					{
						pattern: '@/tests/**',
						group: 'type',
						position: 'after',
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

		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
	},
};
