module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'error',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      {
        allowExpressions: true,
        allowHigherOrderFunctions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    'react/prop-types': 'off',
    'react/jsx-no-target-blank': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'local',
        args: 'none',
      },
    ],
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error',
    '@typescript-eslint/camelcase': [
      'off',
      {
        properties: 'always',
        ignoreDestructuring: true,
      },
    ],

    '@typescript-eslint/no-parameter-properties': 'off',

    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],

    // temporarily turn flags off for debug
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
