module.exports = {
  extends: [
      '@a2seven/eslint-config',
  ],
  rules: {
    indent: ['error', 2],
    'prettier/prettier': [2, { useTabs: false }]
  }
};
