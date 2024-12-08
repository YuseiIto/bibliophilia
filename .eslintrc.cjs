/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

/** @type {import('eslint').Linter.Config} */
module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	env: {
		browser: true,
		commonjs: true,
		es6: true,
	},
	ignorePatterns: ["!**/.server", "!**/.client", "app/components/ui"], // TODO: Remove "app/components/ui" when it's ready

	// Base config
	extends: ["eslint:recommended", "plugin:storybook/recommended"],

	overrides: [
		// React
		{
			files: ["**/*.{js,jsx,ts,tsx}"],
			plugins: ["react", "jsx-a11y"],
			extends: [
				"plugin:react/recommended",
				"plugin:react/jsx-runtime",
				"plugin:react-hooks/recommended",
				"plugin:jsx-a11y/recommended",
			],
			settings: {
				react: {
					version: "detect",
				},
				formComponents: ["Form"],
				linkComponents: [
					{ name: "Link", linkAttribute: "to" },
					{ name: "NavLink", linkAttribute: "to" },
				],
				"import/resolver": {
					typescript: {},
				},
			},
		},

		// Typescript
		{
			files: ["**/*.{ts,tsx}"],
			plugins: ["@typescript-eslint", "import"],
			parser: "@typescript-eslint/parser",
			settings: {
				"import/internal-regex": "^~/",
				"import/resolver": {
					node: {
						extensions: [".ts", ".tsx"],
					},
					typescript: {
						alwaysTryTypes: true,
					},
				},
			},
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:import/recommended",
				"plugin:import/typescript",
			],
			rules: {
				"@typescript-eslint/no-explicit-any": "off", // TODO: Remove this rule when it's ready
				"no-mixed-spaces-and-tabs": "off",
			},
		},

		// Node
		{
			files: [".eslintrc.cjs"],
			env: {
				node: true,
			},
		},
	],
};
