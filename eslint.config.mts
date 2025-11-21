import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.node },
    rules:{
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    }
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  {
    ignores : ["**/dist/**", "**/node_modules/**","tsconfig.json","package.json","package-lock.json","README.md","jest.config.js"],
  },
  
  tseslint.configs.recommended,
]);
