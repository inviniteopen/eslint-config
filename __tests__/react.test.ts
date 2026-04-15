import { ESLint } from "eslint";
import { readFileSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";

import reactConfig from "../react.js";

const eslint = new ESLint({
  overrideConfig: reactConfig,
  overrideConfigFile: true,
});

const fixture = (name: string) =>
  readFileSync(join(__dirname, "fixtures", name), "utf-8");

describe("React Config", () => {
  it("should have @eslint-react rules active", async () => {
    const code = fixture("react-hooks-invalid.tsx");
    const results = await eslint.lintText(code, { filePath: "test.tsx" });
    const ruleIds = results[0].messages.map((m) => m.ruleId);
    expect(ruleIds.some((id) => id?.startsWith("@eslint-react/"))).toBe(true);
  });

  describe("react-refresh/only-export-components", () => {
    it("should pass when only components are exported", async () => {
      const code = fixture("react-refresh-valid.tsx");
      const results = await eslint.lintText(code, { filePath: "test.tsx" });
      const errors = results[0].messages.filter(
        (m) => m.ruleId === "react-refresh/only-export-components",
      );
      expect(errors).toHaveLength(0);
    });

    it("should warn when non-components are exported with components", async () => {
      const code = fixture("react-refresh-invalid.tsx");
      const results = await eslint.lintText(code, { filePath: "test.tsx" });
      const errors = results[0].messages.filter(
        (m) => m.ruleId === "react-refresh/only-export-components",
      );
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe("inherits Node config rules", () => {
    it("should enforce import sorting", async () => {
      const code = fixture("import-sort-invalid.ts");
      const results = await eslint.lintText(code, { filePath: "test.tsx" });
      const errors = results[0].messages.filter(
        (m) => m.ruleId === "simple-import-sort/imports",
      );
      expect(errors.length).toBeGreaterThan(0);
    });

    it("should catch unused imports", async () => {
      const code = fixture("unused-imports-invalid.ts");
      const results = await eslint.lintText(code, { filePath: "test.tsx" });
      const errors = results[0].messages.filter(
        (m) => m.ruleId === "unused-imports/no-unused-imports",
      );
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
