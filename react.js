import eslintReact from "@eslint-react/eslint-plugin";
import { defineConfig } from "eslint/config";
import reactRefresh from "eslint-plugin-react-refresh";

import nodeConfig from "./node.js";

export default defineConfig([
  ...nodeConfig,
  {
    files: ["**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}"],
    extends: [eslintReact.configs["recommended-typescript"]],
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
]);
