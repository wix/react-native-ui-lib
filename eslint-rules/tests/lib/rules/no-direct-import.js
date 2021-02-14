const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-direct-import');

const ruleOptions = [{origin: 'some-module', destination: 'another-module', applyAutofix: true}];

RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  parserOptions: {ecmaVersion: 6, ecmaFeatures: {jsx: true}}
});

const ruleTester = new RuleTester();

const validExample = `import {Component} from 'another-module';`;
const invalidExample = `import {Component} from 'some-module';`;

ruleTester.run('no-direct-import', rule, {
  valid: [
    {
      options: ruleOptions,
      code: validExample
    }
  ],
  invalid: [
    {
      options: ruleOptions,
      code: invalidExample,
      output: `import {Component} from 'another-module';`,
      errors: [
        {message: `Do not import directly from 'some-module'. Please use 'another-module' (autofix available).`}
      ]
    }
  ]
});
