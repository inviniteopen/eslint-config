import type { Linter } from "eslint";

export { default as node } from "./node.js";
export { default as react } from "./react.js";
export { default as svelte } from "./svelte.js";

declare const config: Linter.Config[];
export default config;
