import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['**/node_modules/**', 'client/dist/**', 'tests/golden/**'],
  },

  js.configs.recommended,

  {
    rules: {
      // Los `catch (e)` que no usan el error son deliberados en varios sitios.
      'no-unused-vars': ['error', { caughtErrors: 'none' }],
    },
  },

  // La aplicación: Preact con JSX, ESM, corriendo en el navegador.
  {
    files: ['client/src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs['recommended-latest'].rules,
    },
  },

  // El motor de análisis es un port byte a byte del backend original, verificado
  // contra tests/golden/. Inicializa status/impact/detail con el valor por defecto
  // y luego lo sobrescribe en las ramas: no-useless-assignment lo señala, pero
  // reescribirlo sería refactorizar el motor, que es justo lo que no se hace aquí.
  {
    files: ['client/src/analyzers/**/*.js'],
    rules: {
      'no-useless-assignment': 'off',
    },
  },

  // Configuración de Vite: ESM sobre Node.
  {
    files: ['client/*.js', 'client/*.mjs', 'client/eslint.config.mjs'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: globals.node,
    },
  },

  // Tests: Node. verify-golden es ESM, capture-golden es CommonJS.
  {
    files: ['tests/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: globals.node,
    },
  },
  {
    files: ['tests/**/*.cjs'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'commonjs',
      globals: globals.node,
    },
  },

  // Prettier al final: desactiva las reglas de estilo que se pisarían con él.
  prettier,
];
