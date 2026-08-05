import { ESLint } from "eslint";
import { readFileSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";

import svelteConfig from "../svelte.js";

const eslint = new ESLint({
  overrideConfig: svelteConfig,
  overrideConfigFile: true,
});

const fixture = (name: string) =>
  readFileSync(join(__dirname, "fixtures", name), "utf-8");

describe("Svelte Config", () => {
  it("should parse valid Svelte files with TypeScript without errors", async () => {
    const code = fixture("svelte-valid.svelte");
    const results = await eslint.lintText(code, { filePath: "test.svelte" });
    expect(results[0].messages).toHaveLength(0);
  });

  it("should have svelte rules active", async () => {
    const code = fixture("svelte-invalid.svelte");
    const results = await eslint.lintText(code, { filePath: "test.svelte" });
    const ruleIds = results[0].messages.map((m) => m.ruleId);
    expect(ruleIds).toContain("svelte/no-at-html-tags");
  });

  describe("inherits Node config rules", () => {
    it("should enforce import sorting", async () => {
      const code = fixture("import-sort-invalid.ts");
      const results = await eslint.lintText(code, { filePath: "test.ts" });
      const errors = results[0].messages.filter(
        (m) => m.ruleId === "simple-import-sort/imports",
      );
      expect(errors.length).toBeGreaterThan(0);
    });

    it("should catch unused imports in .svelte script blocks", async () => {
      const code = fixture("svelte-unused-imports-invalid.svelte");
      const results = await eslint.lintText(code, { filePath: "test.svelte" });
      const errors = results[0].messages.filter(
        (m) => m.ruleId === "unused-imports/no-unused-imports",
      );
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
