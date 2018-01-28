const rule = require('../../../lib/rules/no-hard-coded-font-style');
const RuleTester = require('eslint').RuleTester;

const ERROR_MESSAGE = `Please don't use hard coded fontSize prop in style objects, instead use Typography presets`;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
});

const ruleTester = new RuleTester();

ruleTester.run('no-hard-coded-fonts', rule, {
  valid: [
    {
      code: `const goodUsage = <Text style={{color: 'red'}}/>;`,
    },
  ],
  invalid: [
    {
      code: `const badUsage = <Text style={{fontSize: 15, color: 'red'}}/>;`,
      errors: [
        {
          message: ERROR_MESSAGE,
        },
      ],
    },
  ],
});