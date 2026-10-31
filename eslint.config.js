'use strict';

const js = require('@eslint/js');
const globals = require('globals');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
  {
    ignores: ['build/**', 'coverage/**', 'node_modules/**', 'src/serviceWorker.js']
  },
  js.configs.recommended,
  {
    files: ['src/**/*.{js,jsx}'],
    plugins: {
      react
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest
      }
    },
    settings: {
      react: {
        version: '18.3'
      }
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      'react/display-name': 'off', // Memo triggers false positive
      'react/self-closing-comp': 'error',
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-unused-vars': 'warn'
    }
  },
  {
    files: ['src/**/*.{js,jsx}'],
    ...reactHooks.configs['recommended-latest'],
    rules: {
      ...reactHooks.configs['recommended-latest'].rules,
      // The exhaustive-deps rule was never enforced in this project and
      // rewriting the effect dependencies would change runtime behaviour.
      'react-hooks/exhaustive-deps': 'off'
    }
  },
  // Turn off every rule that conflicts with Prettier. Formatting itself is
  // intentionally not enforced here: the repository was formatted with
  // Prettier 1.x and reformatting it is out of scope for this upgrade.
  eslintConfigPrettier
];
