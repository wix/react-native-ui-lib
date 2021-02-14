module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'wix/react-native', 'plugin:react-hooks/recommended'],
  parser: '@typescript-eslint/parser',
  // plugins: ['@typescript-eslint'],
  rules: {
    /* Disabled rules for typescript */
    'no-dupe-class-members': 'off',
    /* Other Rules */
    'no-unused-expressions': 'off',
    'arrow-parens': 'off',
    // TODO: remove after migration of legacy lifecycle methods
    camelcase: 'off',
    'comma-dangle': ['error', 'never'],
    'no-mixed-operators': ['off'],
    'no-trailing-spaces': 'off',
    'operator-linebreak': 'off',
    'max-len': ['warn', {code: 120, ignoreComments: true, ignoreStrings: true}],
    'react/jsx-no-bind': [
      'off',
      {
        ignoreRefs: true,
        allowArrowFunctions: false,
        allowBind: false
      }
    ],
    'function-paren-newline': ['warn', 'never'],
    'new-cap': ['off'], // TODO: fix this in colors.js and remove this
    'default-case': ['off'],
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-unused-vars': [2, {args: 'all', argsIgnorePattern: '^_'}],
    // "@typescript-eslint/no-unused-vars": 0, //todo: uncomment this line and use the the better unused rule above ^
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/indent': 0
  }
};
