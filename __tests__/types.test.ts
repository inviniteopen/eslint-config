import { expectTypeOf } from "expect-type";
import { describe, it } from "vitest";
import type { Linter } from "eslint";

import nodeConfig from "./node.js";
import reactConfig from "./react.js";
import defaultConfig, { node, react } from "./index.js";

describe("Type definitions", () => {
  it("node config should be an array of Linter.Config", () => {
    expectTypeOf(nodeConfig).toEqualTypeOf<Linter.Config[]>();
  });

  it("react config should be an array of Linter.Config", () => {
    expectTypeOf(reactConfig).toEqualTypeOf<Linter.Config[]>();
  });

  it("default export should be an array of Linter.Config", () => {
    expectTypeOf(defaultConfig).toEqualTypeOf<Linter.Config[]>();
  });

  it("named export 'node' should be an array of Linter.Config", () => {
    expectTypeOf(node).toEqualTypeOf<Linter.Config[]>();
  });

  it("named export 'react' should be an array of Linter.Config", () => {
    expectTypeOf(react).toEqualTypeOf<Linter.Config[]>();
  });

  it("configs should be assignable to Linter.Config[]", () => {
    const testConfig: Linter.Config[] = nodeConfig;
    expectTypeOf(testConfig).toEqualTypeOf<Linter.Config[]>();
  });

  it("configs should contain proper config structure", () => {
    expectTypeOf(nodeConfig[0]).toMatchTypeOf<Linter.Config>();
    expectTypeOf(reactConfig[0]).toMatchTypeOf<Linter.Config>();
  });
});
