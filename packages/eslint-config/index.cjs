/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
    'turbo',
  ],
  ignorePatterns: [
    'node_modules/',
    'package.json',
    'package-lock.json',
    'public/',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin'],
  root: true,
  rules: {
    '@typescript-eslint/no-empty-interface': 'off',
    'turbo/no-undeclared-env-vars': 'off',
    // TODO make the following 'on' repo wide
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    // https://stackoverflow.com/a/64067915/5397051
    // Allow unused params if they start with _
    // '@typescript-eslint/no-unused-vars': [
    //   'warn',
    //   {
    //     argsIgnorePattern: '^_',
    //     varsIgnorePattern: '^_',
    //     caughtErrorsIgnorePattern: '^_',
    //     ignoreRestSiblings: true,
    //   },
    // ],
    // forbid usage of unused variables (marked with an _)
    // '@typescript-eslint/naming-convention': [
    //   'error',
    //   {
    //     selector: ['parameter', 'variable'],
    //     leadingUnderscore: 'forbid',
    //     format: null,
    //   },
    //   {
    //     selector: 'parameter',
    //     leadingUnderscore: 'require',
    //     format: null,
    //     modifiers: ['unused'],
    //   },
    // ],
  },
};
