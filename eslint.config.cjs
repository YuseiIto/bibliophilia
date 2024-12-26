const js = require("@eslint/js");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const jsxA11y = require("eslint-plugin-jsx-a11y");
const storybook = require("eslint-plugin-storybook");
const typescript = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");
const importPlugin = require("eslint-plugin-import");
const { includeIgnoreFile } = require("@eslint/compat");
const path = require("node:path");
const globals = require("globals");
const gitignorePath = path.resolve(__dirname, ".gitignore");

module.exports = [
	includeIgnoreFile(gitignorePath),
	// Base config
	{
		files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			parserOptions: { ecmaFeatures: { jsx: true } },
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		plugins: {
			react,
			"jsx-a11y": jsxA11y,
			storybook,
			"react-hooks": reactHooks,
		},
		rules: {
			...js.configs.recommended.rules,
		},
	},

	// React
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		settings: {
			react: { version: "detect" },
			formComponents: ["Form"],
			linkComponents: [
				{ name: "Link", linkAttribute: "to" },
				{ name: "NavLink", linkAttribute: "to" },
			],
			"import/resolver": {
				typescript: {},
			},
		},
		rules: {
			...react.configs.recommended.rules,
			...react.configs["jsx-runtime"].rules,
			...jsxA11y.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
		},
	},

	// Typescript
	{
		files: ["**/*.{ts,tsx}"],
		plugins: { "@typescript-eslint": typescript, import: importPlugin },
		languageOptions: {
			parser: typescriptParser,
		},
		settings: {
			"import/internal-regex": "^~/",
			"import/resolver": {
				node: {
					extensions: [".ts", ".tsx"],
				},
				typescript: { alwaysTryTypes: true },
			},
		},
		rules: {
			...typescript.configs.recommended.rules,
			...importPlugin.configs.recommended.rules,
			...importPlugin.configs.typescript.rules,
			"@typescript-eslint/no-explicit-any": "off", // TODO: Remove this rule when it's ready
			"no-mixed-spaces-and-tabs": "off",
		},
	},

	// Node
	{
		files: [".eslintrc.cjs"],
		languageOptions: {
			globals: { ...globals.node },
		},
	},
	{
		ignores: [
			"**/.server",
			"**/.client",
			"worker-configuration.d.ts", // Auto-generated file
			"app/components/ui", // TODO: Remove "app/components/ui" when it's ready
		],
	},
];
