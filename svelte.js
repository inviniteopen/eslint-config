import { defineConfig } from "eslint/config";
import svelte from "eslint-plugin-svelte";
import tseslint from "typescript-eslint";

import nodeConfig from "./node.js";

export default defineConfig([
  ...nodeConfig,
  ...svelte.configs.recommended,
  {
    files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".svelte"],
      },
    },
  },
  ...svelte.configs.prettier,
]);
