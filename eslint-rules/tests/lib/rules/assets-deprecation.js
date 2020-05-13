const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/assets-deprecation');
const deprecationsJson = require('../../assets_deprecation.json');


RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  parserOptions: {ecmaVersion: 6, ecmaFeatures: {jsx: true}},
});

const ruleTester = new RuleTester();

const ruleOptions = [{deprecations: deprecationsJson, source: 'some_module', dueDate: '2 November, Friday'}];
const mimRuleOptions = [{deprecations: deprecationsJson, source: 'some_module'}];
const validExample = 'const test = <Button iconSource={Assets.icons.general.valid}/>';
const validImportExample = 'import {Assets} from \'another-module\'; const test = <Button iconSource={Assets.icons.deprecated}/>';
const invalidExample = `import {Assets} from '${ruleOptions[0].source}'; ` + 
  'const test = <Button iconSource={Assets.icons.deprecated}/>';
const invalidSpreadExample = `import {Assets} from '${ruleOptions[0].source}'; ` + 
  'const others = {iconSource: Assets.icons.deprecated}; const test = <Button {...others}/>';


ruleTester.run('assets-deprecation', rule, {
  valid: [
    {
      options: ruleOptions,
      code: validExample,
    },
    {
      options: ruleOptions,
      code: validImportExample,
    },
  ],
  invalid: [
    {
      options: mimRuleOptions,
      code: invalidExample,
      errors: [
        {
          message: "'Assets.icons.deprecated' is deprecated. Use 'Assets.icons.general.valid' instead.",
        },
      ],
    },
    {
      options: ruleOptions,
      code: invalidExample,
      errors: [
        {
          message: "'Assets.icons.deprecated' is deprecated. Use 'Assets.icons.general.valid' instead. " + 
            'Please fix this issue by 2 November, Friday!',
        },
      ],
    },
    {
      options: ruleOptions,
      code: invalidSpreadExample,
      errors: [
        {
          message: "'Assets.icons.deprecated' is deprecated. Use 'Assets.icons.general.valid' instead. " + 
            'Please fix this issue by 2 November, Friday!',
        },
      ],
    },
  ],
});
