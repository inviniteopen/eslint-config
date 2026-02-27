import reactJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

import nodeConfig from "./node.js";

export default [
  ...nodeConfig,
  reactRecommended,
  reactJsxRuntime,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      "react-refresh": reactRefresh,
      "react-hooks": reactHooks,
    },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];
