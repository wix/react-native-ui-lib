const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-direct-import');

const ruleOptions = [
  {origin: 'deprecated-module1', destination: 'valid-module1', applyAutofix: true}
];

const ruleOptionsArray = [
  {
    rules: [
      {origin: 'deprecated-module1', destination: 'valid-module1', applyAutofix: true},
      {origin: 'deprecated-module2', destination: 'valid-module2', applyAutofix: true}
    ]
  }
];

customErrorMessage = 'This is a custom message';
const ruleWithCustomMessage = [
  {origin: 'deprecated-module1', destination: 'valid-module1', applyAutofix: true, customMessage: customErrorMessage}
]

RuleTester.setDefaultConfig({
  parser: require.resolve('babel-eslint'),
  parserOptions: {ecmaVersion: 6, ecmaFeatures: {jsx: true}}
});

const ruleTester = new RuleTester();

const validExample1 = `import {Component} from 'valid-module1';`;
const validExample2 = `import {Component} from 'valid-module2';`;
const validExample3 = `const {Component} = require('valid-module1');`;
const validExample4 = `const test = require('valid-module2').test;`;
const validExample5 = `export const credentials = { email: 'test@test.com', password: 'test' };`;
const validExample6 = `const digits = 'phoneNumber'.split(''); for (const digit of digits) { console.log(digit); };`;
const validDefault = `import something from 'valid-module1';`;

const invalidExample1 = `import {Component} from 'deprecated-module1';`;
const invalidExample2 = `import {Component} from 'deprecated-module2';`;
const invalidExample3 = `const {Component} = require('deprecated-module1');`;
const invalidExample4 = `const {Component} = require('deprecated-module2');`;
const invalidExample4Output = `const {Component} = require('valid-module2');`;
const invalidExample5 = `const test = require(\'deprecated-module1\').test;`;
const invalidExample5Output = `const test = require(\'valid-module1\').test;`;
const invalidDefault = `import something from 'deprecated-module1';`;

const error1 = `Do not import directly from 'deprecated-module1'. Please use 'valid-module1' (autofix available).`;
const error2 = `Do not import directly from 'deprecated-module2'. Please use 'valid-module2' (autofix available).`;
const requireError1 = `Do not require directly from 'deprecated-module1'. Please use 'valid-module1' (autofix available).`;
const requireError2 = `Do not require directly from 'deprecated-module2'. Please use 'valid-module2' (autofix available).`;

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
      output: validExample1,
      errors: [
        {message: error1}
      ]
    },
    {
      options: ruleOptionsArray,
      code: invalidExample1,
      output: validExample1,
      errors: [
        {message: error1}
      ]
    },
    {
      options: ruleOptionsArray,
      code: invalidExample2,
      output: validExample2,
      errors: [
        {message: error2}
      ]
    },
    {
      options: ruleOptions,
      code: invalidExample3,
      output: validExample3,
      errors: [
        {message: requireError1}
      ]
    },
    {
      options: ruleOptionsArray,
      code: invalidExample4,
      output: invalidExample4Output,
      errors: [
        {message: requireError2}
      ]
    },
    {
      options: ruleWithCustomMessage,
      code: invalidExample1,
      output: validExample1,
      errors: [
        {message: customErrorMessage}
      ]
    },
    {
      options: ruleWithCustomMessage,
      code: invalidExample3,
      output: validExample3,
      errors: [
        {message: customErrorMessage}
      ]
    },
    {
      options: ruleOptions,
      code: invalidExample5,
      output: invalidExample5Output,
      errors: [
        {message: requireError1}
      ]
    },
    {
      options: ruleOptions,
      code: invalidDefault,
      output: validDefault,
      errors: [
        {message: error1}
      ]
    }
  ]
});
