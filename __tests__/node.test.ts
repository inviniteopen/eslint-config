import { ESLint } from "eslint";
import { readFileSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";

import nodeConfig from "../node.js";

const eslint = new ESLint({
  overrideConfig: nodeConfig,
  overrideConfigFile: true,
});

const fixture = (name: string) =>
  readFileSync(join(__dirname, "fixtures", name), "utf-8");

describe("Node Config", () => {
  describe("simple-import-sort/imports", () => {
    it("should pass when imports are sorted correctly", async () => {
      const code = fixture("import-sort-valid.ts");
      const results = await eslint.lintText(code, { filePath: "test.ts" });
      const errors = results[0].messages.filter(
        (m) => m.ruleId === "simple-import-sort/imports"
      );
      expect(errors).toHaveLength(0);
    });

    it("should fail when imports are not sorted", async () => {
      const code = fixture("import-sort-invalid.ts");
      const results = await eslint.lintText(code, { filePath: "test.ts" });
      const errors = results[0].messages.filter(
        (m) => m.ruleId === "simple-import-sort/imports"
      );
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe("unused-imports/no-unused-imports", () => {
    it("should pass when all imports are used", async () => {
      const code = fixture("unused-imports-valid.ts");
      const results = await eslint.lintText(code, { filePath: "test.tsx" });
      const errors = results[0].messages.filter(
        (m) => m.ruleId === "unused-imports/no-unused-imports"
      );
      expect(errors).toHaveLength(0);
    });

    it("should fail when imports are unused", async () => {
      const code = fixture("unused-imports-invalid.ts");
      const results = await eslint.lintText(code, { filePath: "test.tsx" });
      const errors = results[0].messages.filter(
        (m) => m.ruleId === "unused-imports/no-unused-imports"
      );
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].message).toContain("useEffect");
    });
  });

  describe("@typescript-eslint/no-unused-vars", () => {
    it("should pass when unused vars are prefixed with underscore", async () => {
      const code = fixture("unused-vars-valid.ts");
      const results = await eslint.lintText(code, { filePath: "test.ts" });
      const errors = results[0].messages.filter(
        (m) => m.ruleId === "@typescript-eslint/no-unused-vars"
      );
      expect(errors).toHaveLength(0);
    });

    it("should warn when vars are unused without underscore", async () => {
      const code = fixture("unused-vars-invalid.ts");
      const results = await eslint.lintText(code, { filePath: "test.ts" });
      const errors = results[0].messages.filter(
        (m) => m.ruleId === "@typescript-eslint/no-unused-vars"
      );
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].message).toContain("locale");
    });
  });
});
