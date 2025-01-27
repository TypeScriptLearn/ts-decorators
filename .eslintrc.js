module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', '@stylistic/js'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    '@stylistic/js/padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'var', next: 'return' },
    ],
    // '@stylistic/js/multiline-ternary': ['error', 'always'],
    '@stylistic/js/lines-between-class-members': ['error', 'always'],
    '@stylistic/js/lines-around-comment': [
      'error',
      { beforeBlockComment: true },
    ],
    '@stylistic/js/line-comment-position': ['error', { position: 'above' }],
    '@stylistic/js/keyword-spacing': ['error', { before: true }],
    '@stylistic/js/key-spacing': ['error', { beforeColon: false }],
  },
  root: true,
};
