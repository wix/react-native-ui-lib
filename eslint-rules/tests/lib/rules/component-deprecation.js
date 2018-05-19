const _ = require('lodash');
const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/component-deprecation');
const deprecationsJson = require('../../component_deprecation.json');

const ruleOptions = [deprecationsJson];

RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  parserOptions: { ecmaVersion: 6, ecmaFeatures: { jsx: true } },
});

const ruleTester = new RuleTester();

const valideExample = 'const test = <Avatar backgroundColor={Colors.red30}/>';
const invalideExample = 'const test = <Avatar color={Colors.red30}/>';

ruleTester.run('component-deprecation', rule, {
  valid: [
    {
      options: ruleOptions,
      code: valideExample,
    },
  ],
  invalid: [
    {
      options: ruleOptions,
      code: invalideExample,
      errors: [
        { message: 'The \'Avatar\' component\'s prop \'color\' is deprecated. Please use the \'backgroundColor\' prop instead.' },
      ],
    },
  ],
});
