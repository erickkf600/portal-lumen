import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      prettier: prettierPlugin,
      react,
    },
    rules: {
      'no-unused-vars': 'warn',
      'prettier/prettier': 'error',
      'react/display-name': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
      'max-len': ['error', { code: 120 }],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'function',
          format: ['PascalCase', 'camelCase'],
        },
      ],
    },
  },
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',
    'dist/**',
    '.env*.local',
    'package-lock.json',
  ]),
])

export default eslintConfig
