
const _ = require('lodash');
const Colors = require('../../../../src/style/colorsPalette');
const rule = require('../../../lib/rules/no-hard-coded-color');
const RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  parserOptions: { ecmaVersion: 6, ecmaFeatures: { jsx: true } },
  settings: {
    uiLib: {
      validColors: Colors,
    },
  },
});
const invalidStyleSheetExample = `StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '${Colors.dark30}'
  }
})
`;

const validStyleSheetExample = `StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: Colors.dark30
  }
})
`;

const invalidConditionalExpression = `const test = <Text style = {{ color: true ? '${Colors.dark10}' : '${Colors.dark20}'}}> </Text>;`;
const validConditionalExpression = 'const test = <Text style = {{ color: true ? Colors.dark10 : Colors.dark20}}> </Text>;';

const invalidIdentifierExample = `
  const x = true ? '${Colors.dark10}' : '${Colors.dark20}'
  const test = <Text style = {{ color: x }}> </Text>;
`;
const validIdentifierExample = `
  const x = true ? Colors.dark10 : Colors.dark20
  const test = <Text style = {{ color: x }}> </Text>;
`;
const ruleTester = new RuleTester();

ruleTester.run('no-hard-coded-color', rule, {
  valid: [
    { code: 'const goodUsage = <Text style={{color: Constants.dark10}}/>;' },
    { code: 'const goodUsage = <View style={{backgroundColor: Constants.blue20}}/>;' },
  ],
  invalid: [
    {
      code: invalidStyleSheetExample,
      output: validStyleSheetExample,
      errors: [
        { messageId: 'uiLib' },
      ],
    },
    {
      code: invalidConditionalExpression,
      output: validConditionalExpression,
      errors: [
        { messageId: 'uiLib' },
        { messageId: 'uiLib' },
      ],
    },
    {
      code: invalidIdentifierExample,
      output: validIdentifierExample,
      errors: [
        { messageId: 'uiLib' },
        { messageId: 'uiLib' },
      ],
    },
    {
      code: `const badUsage = <Text style = {{ color: '${Colors.dark10}'}}> </Text>;`,
      output: 'const badUsage = <Text style = {{ color: Colors.dark10}}> </Text>;',
      errors: [
        { messageId: 'uiLib' },
      ],
    },
    {
      code: 'const badUsage = <Text style={{color: \'#123456\'}}/>;',
      errors: [
        { messageId: 'uiLib' },
      ],
    },
    {
      code: `const badUsage = <Text style = {{ color: '${Colors.dark10.toLowerCase()}'}}> </Text>;`,
      output: 'const badUsage = <Text style = {{ color: Colors.dark10}}> </Text>;',
      errors: [
        { messageId: 'uiLib' },
      ],
    },
  ],
});
