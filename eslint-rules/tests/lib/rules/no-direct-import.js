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

customErrorMessage = 'This is a custom message';
const ruleWithCustomMessage = [
  {origin: 'some-module', destination: 'another-module', applyAutofix: true, customMessage: customErrorMessage}
]

RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  parserOptions: {ecmaVersion: 6, ecmaFeatures: {jsx: true}}
});

const ruleTester = new RuleTester();

const validExample1 = `import {Component} from 'another-module';`;
const validExample2 = `import {Component} from 'new-module';`;
const validExample3 = `const {Component} = require('another-module');`;
const validExample4 = `const test = require('new-module').test;`;
const validExample5 = `export const credentials = { email: 'test@test.com', password: 'test' };`;
const validExample6 = `const digits = 'phoneNumber'.split(''); for (const digit of digits) { console.log(digit); };`;
const validDefault = `import something from 'another-module';`;

const invalidExample1 = `import {Component} from 'some-module';`;
const invalidExample2 = `import {Component} from 'old-module';`;
const invalidExample3 = `const {Component} = require('some-module');`;
const invalidExample4 = `const {Component} = require('old-module');`;
const invalidExample5 = `const test = require(\'some-module\').test;`;
const invalidDefault = `import something from 'some-module';`;

const error1 = `Do not import directly from 'some-module'. Please use 'another-module' (autofix available).`;
const error2 = `Do not import directly from 'old-module'. Please use 'new-module' (autofix available).`;
const requireError1 = `Do not require directly from 'some-module'. Please use 'another-module' (autofix available).`;
const requireError2 = `Do not require directly from 'old-module'. Please use 'new-module' (autofix available).`;

ruleTester.run('no-direct-import', rule, {
  valid: [
    {
      options: ruleOptions,
      code: validExample1
    },
    {
      options: ruleOptions,
      code: validExample3
    },
    {
      options: ruleOptionsArray,
      code: validExample1
    },
    {
      options: ruleOptionsArray,
      code: validExample2
    },
    {
      options: ruleOptionsArray,
      code: validExample3
    },
    {
      options: ruleOptionsArray,
      code: validExample4
    },
    {
      options: ruleOptionsArray,
      code: validExample5
    },
    {
      options: ruleOptionsArray,
      code: validExample6
    },
    {
      options: ruleOptions,
      code: validDefault
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
    },
    {
      options: ruleOptions,
      code: invalidExample3,
      output: `const {Component} = require('another-module');`,
      errors: [
        {message: requireError1}
      ]
    },
    {
      options: ruleOptionsArray,
      code: invalidExample4,
      output: `const {Component} = require('new-module');`,
      errors: [
        {message: requireError2}
      ]
    },
    {
      options: ruleWithCustomMessage,
      code: invalidExample1,
      errors: [
        {message: customErrorMessage}
      ]
    },
    {
      options: ruleWithCustomMessage,
      code: invalidExample3,
      errors: [
        {message: customErrorMessage}
      ]
    },
    {
      options: ruleOptions,
      code: invalidExample5,
      output: 'const test = require(\'another-module\').test;',
      errors: [
        {message: requireError1}
      ]
    },
    {
      options: ruleOptions,
      code: invalidDefault,
      output: 'import something from \'another-module\';',
      errors: [
        {message: error1}
      ]
    }
  ]
});
