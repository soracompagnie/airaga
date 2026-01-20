import { configs as js } from "@eslint/js";
import { defineConfig } from "eslint/config";
import { node } from "globals";
import { configs as ts } from "typescript-eslint";

export default defineConfig([
  js.recommended,
  ...ts.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...node },
      parserOptions: {
        project: ["tsconfig.eslint.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/strict-boolean-expressions": "off",
    },
  },
  { ignores: ["dist", "node_modules", "coverage", "eslint.config.ts"] },
]);