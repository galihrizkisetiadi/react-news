import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{ files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"] },
	{ files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], languageOptions: { globals: globals.browser } },
	tseslint.config(js.configs.recommended, tseslint.configs.recommendedTypeChecked, {
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-unsafe-return": "off",
			"@typescript-eslint/no-misused-promises": "off",
			"no-console": "warn",
		},
	}),
	pluginReact.configs.flat.recommended,
	pluginReact.configs.flat["jsx-runtime"],
]);
