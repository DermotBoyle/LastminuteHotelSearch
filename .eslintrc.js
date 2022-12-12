// eslint-disable-next-line no-undef -- This is a linting config file, and as it's outside of the src, uses commonjs exports.
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [ 'react', '@typescript-eslint' ],
  rules: {
    '@typescript-eslint/indent': [ 'error', 2 ],
    'linebreak-style': [ 'error', 'unix' ],
    quotes: [ 'off' ],
    semi: [ 'error', 'never' ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'comma',
          requireLast: true,
        },
        singleline: {
          delimiter: 'comma',
          requireLast: false,
        },
      },
    ],
    'prefer-arrow-callback': [ 'error' ],
    'arrow-spacing': [ 'error' ],
    'react/display-name': [ 'off' ],
    'react/jsx-indent': [ 'error', 2 ],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/prop-types': 'off',
    'object-curly-spacing': [ 'error', 'always' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'keyword-spacing': [ 'error' ],
    'no-multiple-empty-lines': [ 'warn', { max: 1 } ],
  },
}
