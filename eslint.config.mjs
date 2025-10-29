import globals from "globals";
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import prettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default [
  // 🧱 JavaScript 基本建議規則
  js.configs.recommended,

  // 🧩 TypeScript 推薦設定
  ...tseslint.configs.recommended,
  // 🧭 Next.js Plugin
  {
    plugins: { "@next/next": nextPlugin },

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        myCustomGlobal: "readonly",
      },
    },

    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@next/next/no-page-custom-font": "off",
    },
  },

  // 🎨 Prettier (關閉與格式化衝突的規則)
  prettier,

  // 📦 你的自訂規則
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "react/no-unescaped-entities": "off",
      "react-hooks/rules-of-hooks": 0,
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "no-console": 1,
      "comma-dangle": 0,
      quotes: [
        2,
        "single",
        {
          avoidEscape: true,
          allowTemplateLiterals: true,
        },
      ],
    },
  },
];
