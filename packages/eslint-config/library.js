const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * typescript packages.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/typescript",
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
      node: {
        extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/"],
  rules: {
    "@typescript-eslint/prefer-nullish-coalescing": 0,
    "@typescript-eslint/no-unnecessary-condition": 0,
    "@typescript-eslint/naming-convention": 0,
    "@typescript-eslint/no-extraneous-class": 0,
    "@typescript-eslint/no-explicit-any": 1,
    "eslint-comments/require-description": 0,
    "unicorn/filename-case": 0,
    "import/no-cycle": 0,
    "no-console": 1,
    "@typescript-eslint/no-unsafe-assignment": 1,
  }
};