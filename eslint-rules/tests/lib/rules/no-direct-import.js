const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-direct-import');

const ruleOptions = [
  {origin: 'some-module', destination: 'another-module', applyAutofix: true}
];

const ruleOptionsArray = [
  {
    rules: [
      {origin: 'some-module', destination: 'another-module', applyAutofix: true},
      {origin: 'old-module', destination: 'new-module', applyAutofix: true}
    ]
  }
];

RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  parserOptions: {ecmaVersion: 6, ecmaFeatures: {jsx: true}}
});

const ruleTester = new RuleTester();

const validExample1 = `import {Component} from 'another-module';`;
const validExample2 = `import {Component} from 'new-module';`;

const invalidExample1 = `import {Component} from 'some-module';`;
const invalidExample2 = `import {Component} from 'old-module';`;

const error1 = `Do not import directly from 'some-module'. Please use 'another-module' (autofix available).`;
const error2 = `Do not import directly from 'old-module'. Please use 'new-module' (autofix available).`;

ruleTester.run('no-direct-import', rule, {
  valid: [
    {
      options: ruleOptions,
      code: validExample1 
    },
    {
      options: ruleOptionsArray,
      code: validExample1
    },
    {
      options: ruleOptionsArray,
      code: validExample2 
    }
  ],
  invalid: [
    {
      options: ruleOptions,
      code: invalidExample1,
      output: `import {Component} from 'another-module';`,
      errors: [
        {message: error1}
      ]
    },
    {
      options: ruleOptionsArray,
      code: invalidExample1,
      output: `import {Component} from 'another-module';`,
      errors: [
        {message: error1}
      ]
    },
    {
      options: ruleOptionsArray,
      code: invalidExample2,
      output: `import {Component} from 'new-module';`,
      errors: [
        {message: error2}
      ]
    }
  ]
});
