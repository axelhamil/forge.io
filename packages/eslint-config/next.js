const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/typescript",
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/react",
    "@vercel/style-guide/eslint/next",
    "eslint-config-turbo",
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
  plugins: ["unused-imports"],
  rules: {
    "import/no-default-export": 0,
    "unicorn/filename-case": 0,
    "@typescript-eslint/prefer-nullish-coalescing": 0,
    "@typescript-eslint/no-unnecessary-condition": 0,
    "@typescript-eslint/naming-convention": 0,
    "@typescript-eslint/no-explicit-any": 1,
    "@typescript-eslint/no-shadow": 0,
    "@typescript-eslint/no-base-to-string": 0,
    "@typescript-eslint/no-floating-promises": 0,
    "@typescript-eslint/no-misused-promises": 0,
    "@typescript-eslint/unbound-method": 0,
    "@typescript-eslint/consistent-type-definitions": 0,
    "react/no-unstable-nested-components": 0,
    "eslint-comments/require-description": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-cycle": 0,
    "no-unused-vars": 0,
    "no-console": 1,
    "no-new": 1,
    "import/named": 0,
    "unused-imports/no-unused-imports": 2,
  },
};
