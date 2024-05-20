const { configure, presets } = require('eslint-kit');

module.exports = configure({
  allowDebug: process.env.NODE_ENV !== 'production',
  mode: 'only-errors',

  presets: [
    presets.imports(),
    presets.node(),
    presets.prettier(),
    presets.typescript(),
  ],
  extend: {
    rules: {
      '@typescript-eslint/no-useless-constructor': 'off',
      'import/no-default-export': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
    },
  },
});
