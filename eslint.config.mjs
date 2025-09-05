import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
	// ignorar carpetas
	{ ignores: ["node_modules/"] },

	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
		plugins: { js },
		extends: ["js/recommended"],
		languageOptions: { globals: globals.browser },
		rules: {
			"eqeqeq": "off",
			"no-dupe-else-if": "error",
			"no-console": "warn",
			"no-eval": "error",
			"no-multi-spaces": "error",
			"indent": ["error", "tab"],
			"semi": ["error", "always"],
			"no-multiple-empty-lines": ["error", { "max": 1 }],
			"no-unused-vars": "error",
			"no-shadow": "error",
			"prefer-const": "error"
		}
	},

	tseslint.configs.recommended,
]);