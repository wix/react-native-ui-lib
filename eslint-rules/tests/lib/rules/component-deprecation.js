const _ = require('lodash');
const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/component-deprecation');

const ruleOptions = [];

RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  parserOptions: { ecmaVersion: 6, ecmaFeatures: { jsx: true } },
});

const ruleTester = new RuleTester();

const valideExample = 'const test = <Avatar backgroundColor={Colors.red30}/>';
const invalideExample = 'const test = <Avatar color={Colors.red30}/>';

ruleTester.run('component-deprecation', rule, {
  valid: [
    { code: valideExample },
  ],
  invalid: [
    {
      options: ruleOptions,
      code: invalideExample,
      output: valideExample,
      errors: [
        { message: 'The \'Avatar\' component\'s prop \'color\' is defrecated. Please use the \'backgroundColor\' prop instead.' },
      ],
    },
  ],
});
