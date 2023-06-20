const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/string-deprecation');
const deprecationsJson = require('../../string_deprecation.json');

RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  parserOptions: {ecmaVersion: 6, ecmaFeatures: {jsx: true}}
});

const ruleTester = new RuleTester();


const options = [{deprecations: deprecationsJson}];
const optionsWithDate = [{deprecations: deprecationsJson, dueDate: '2 November, Friday'}];

const fullClassValid = "const s1 = 'https://go.here.com/home'; export const CONFIG = { bla1: 100, bla2: { bla3: 'some string', }, bla4: { bla5: 30000, bla6: 20, bla7: false, }, bla8: 'another string', bla9: { bla10: 'https://blabliblu.com/home', bla11: 'https://duptiduptida.org/horses', bla12: 'https://netowrk.net', bla13: 'https://api-for-free/not-a-scam', bla14: `${s1}/geocode/json`, bla15: `${s1}/place/autocomplete/json`, bla16: `${s1}/place/details/json`, bla17: 'https://go.here.com/home/', }, bla18: 5,};"
const fullClassInvalid = "const s1 = 'https://do.not.go.here.com/home'; export const CONFIG = { bla1: 100, bla2: { bla3: 'some string', }, bla4: { bla5: 30000, bla6: 20, bla7: false, }, bla8: 'another string', bla9: { bla10: 'https://blabliblu.com/home', bla11: 'https://duptiduptida.org/horses', bla12: 'https://netowrk.net', bla13: 'https://api-for-free/not-a-scam', bla14: `${s1}/geocode/json`, bla15: `${s1}/place/autocomplete/json`, bla16: `${s1}/place/details/json`, bla17: 'https://do.not.go.here.com/home/', }, bla18: 5,};"

const error =
  "'https://do.not.go.here.com/home' is deprecated. Please stop going here.";
const errorDate = ' Please fix this issue by 2 November, Friday!';

ruleTester.run('string-deprecation', rule, {
  valid: [
    {
      options: options,
      code: fullClassValid,
    }
  ],
  invalid: [
    {
      options: options,
      code: fullClassInvalid,
      output: fullClassInvalid,
      errors: [{message: error}]
    },
    {
      options: optionsWithDate,
      code: fullClassInvalid,
      output: fullClassInvalid,
      errors: [{message: error + errorDate}]
    }
  ]
});
