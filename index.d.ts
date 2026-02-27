import type { Linter } from "eslint";

export { default as node } from "./node.js";
export { default as react } from "./react.js";

declare const config: Linter.Config[];
export default config;
