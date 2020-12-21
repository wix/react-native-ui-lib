const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/prop-value-shape-deprecation');
const deprecationsJson = require('../../prop-value-shape-deprecation.json');

RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  parserOptions: {ecmaVersion: 6, ecmaFeatures: {jsx: true}}
});

const ruleTester = new RuleTester();

const ruleOptions = [{deprecations: deprecationsJson}];

ruleTester.run('prop-value-shape-deprecation', rule, {
  valid: [
    {
      options: ruleOptions,
      code: '<ListItem avatar={{source: {uri: some_uri}}}/>'
    }
  ],
  invalid: [
    {
      options: ruleOptions,
      code: '<ListItem avatar={{imageSource: {uri: some_uri}}}/>',
      errors: [{message: `The shape of 'avatar' prop of 'ListItem' doesn't contain 'imageSource' anymore. Please use 'source' instead (fix is available).`}],
      output: '<ListItem avatar={{source: {uri: some_uri}}}/>'
    }
  ]
});
