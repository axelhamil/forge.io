module.exports = {
  extends: ["@repo/eslint-config/library.js"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "import/no-default-export": "off",
  },
};
