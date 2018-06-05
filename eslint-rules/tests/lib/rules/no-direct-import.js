const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-direct-import');

const ruleOptions = [{ origin: 'some-module', destination: 'another-module' }];

RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  parserOptions: { ecmaVersion: 6, ecmaFeatures: { jsx: true } },
});

const ruleTester = new RuleTester();

const valideExample = `import {Component} from 'another-module';`;
const invalideExample = `import {Component} from 'some-module';`;

ruleTester.run('no-direct-import', rule, {
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
        { message: `Do not import directly from 'some-module'. Please use 'another-module' (autofix available).` },
      ],
    },
  ],
});
