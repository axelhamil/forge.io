const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    require.resolve("@vercel/style-guide/eslint/next"),
    "eslint-config-turbo",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:drizzle/recommended"
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
    es2021: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    project: "./tsconfig.json",
    sourceType: "module",
  },
  parser: "@typescript-eslint/parser",
  plugins: ["only-warn", "simple-import-sort", "sort-keys-fix", "unused-imports", "drizzle"],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    ".eslintrc.js",
    "**/.next/**",
    "**/build/**",
    "**/dist/**",
    "**/node_modules/**",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  rules: {
    "@typescript-eslint/consistent-type-assertions": 1,
    "@typescript-eslint/explicit-function-return-type": 1,
    "@typescript-eslint/no-explicit-any": 1,
    "@typescript-eslint/no-use-before-define": "warn",
    "@typescript-eslint/prefer-optional-chain": 1,
    "comma-spacing": ["error", { after: true, before: false }],
    "turbo/no-undeclared-env-vars": 0,
    eqeqeq: 1,
    "object-curly-spacing": ["error", "always"],
    "prettier/prettier": [
      1,
      {
        arrowParens: "always",
        bracketSpacing: true,
        doubleQuote: true,
        endOfLine: "lf",
        htmlWhitespaceSensitivity: "css",
        jsxBracketSameLine: false,
        jsxSingleQuote: false,
        printWidth: 80,
        proseWrap: "preserve",
        quoteProps: "as-needed",
        semi: true,
        tabWidth: 2,
        trailingComma: "all",
        useTabs: false,
      },
    ],
    "simple-import-sort/exports": 2,
    "simple-import-sort/imports": 2,
    "sort-keys": [
      1,
      "asc",
      {
        caseSensitive: true,
        minKeys: 2,
        natural: false,
      },
    ],
    "sort-keys-fix/sort-keys-fix": 1,
    "unused-imports/no-unused-imports": 2,
  }
};
