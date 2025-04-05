import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';

export default tseslint.config({
  files: ['**/*.ts'],
  extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
  languageOptions: {
    globals: { ...globals.browser, ...globals.node },
    parserOptions: {
      projectFolderIgnoreList: ['.config/*', '**/node_modules/', '**/test-results/', '**/playwright-report/', '**/playwright/.cache/'],
    },
  },
  rules: {
    'no-duplicate-imports': 'error',
    'no-undef': 'error',
    'no-unused-vars': 'error',
    camelcase: 'error',
  },
});
