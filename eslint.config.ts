import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  tseslint.configs.recommended,
  {
    files: ['src/**/*.ts'],
    plugins: { js, '@stylistic': stylistic, },
    rules:
    {
      'no-redeclare': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      "@typescript-eslint/no-unused-vars": 'off',
      "@typescript-eslint/no-this-alias": 'off',
      '@stylistic/no-trailing-spaces': ['warn'],
      '@stylistic/indent': ['warn', 4],
      '@stylistic/brace-style': ['warn', 'allman', { allowSingleLine: true }],
      '@stylistic/semi': ['warn', 'always'],
    },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
])
