const Colors = require('../../../../src/style/colorsPalette').colorsPalette;
const extraFixColorsMap = require('../../../../src/style/colorsPalette').extraFixColorsMap;
const rule = require('../../../lib/rules/no-hard-coded-color');
const RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  parserOptions: { ecmaVersion: 6, ecmaFeatures: { jsx: true } },
});
const ruleOptions = [{validColors: Colors, customColors: extraFixColorsMap}];

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
      options: ruleOptions,
      code: invalidStyleSheetExample,
      output: validStyleSheetExample,
      errors: [
        { message: "Found '#66737C'. Use UILib colors instead of hardcoded colors." },
      ],
    },
    {
      options: ruleOptions,
      code: invalidConditionalExpression,
      output: validConditionalExpression,
      errors: [
        { message: "Found '#20303C'. Use UILib colors instead of hardcoded colors." },
        { message: "Found '#43515C'. Use UILib colors instead of hardcoded colors." },
      ],
    },
    {
      options: ruleOptions,
      code: invalidIdentifierExample,
      output: validIdentifierExample,
      errors: [
        { message: "Found '#20303C'. Use UILib colors instead of hardcoded colors." },
        { message: "Found '#43515C'. Use UILib colors instead of hardcoded colors." },
      ],
    },
    {
      options: ruleOptions,
      code: `const badUsage = <Text style = {{ color: '${Colors.dark10}'}}> </Text>;`,
      output: 'const badUsage = <Text style = {{ color: Colors.dark10}}> </Text>;',
      errors: [
        { message: "Found '#20303C'. Use UILib colors instead of hardcoded colors." },
      ],
    },
    {
      options: ruleOptions,
      code: 'const badUsage = <Text style={{color: \'#123456\'}}/>;',
      errors: [
        { message: "Found '#123456'. Use UILib colors instead of hardcoded colors." },
      ],
    },
    {
      options: ruleOptions,
      code: `const badUsage = <Text style = {{ color: '${Colors.dark10.toLowerCase()}'}}> </Text>;`,
      output: 'const badUsage = <Text style = {{ color: Colors.dark10}}> </Text>;',
      errors: [
        { message: "Found '#20303c'. Use UILib colors instead of hardcoded colors." },
      ],
    },
    {
      options: ruleOptions,
      code: 'const badUsage = <Text style = {{ color: \'#fff\'}}> </Text>;',
      output: 'const badUsage = <Text style = {{ color: Colors.white}}> </Text>;',
      errors: [
        { message: "Found '#fff'. Use UILib colors instead of hardcoded colors." },
      ],
    },
    {
      options: [{...ruleOptions[0], dueDate: 'Thursday, 12 August'}],
      code: 'const badUsage = <Text style = {{ color: \'#ffffff\'}}> </Text>;',
      output: 'const badUsage = <Text style = {{ color: Colors.white}}> </Text>;',
      errors: [
        { message: "Found '#ffffff'. Use UILib colors instead of hardcoded colors. Please fix this issue by Thursday, 12 August!" },
      ],
    },
  ],
});
