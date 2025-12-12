const Colors = {
  grey10: '#20303C',
  grey20: '#43515C',
  grey30: '#66737C',
  white: '#ffffff',
  black: '#000000'
};

const extraFixColorsMap = {
  black: 'black',
  white: 'white',
  '#000': 'black',
  '#fff': 'white'
};

const rule = require('../../../lib/rules/no-hard-coded-color');
const RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  parserOptions: {ecmaVersion: 6, ecmaFeatures: {jsx: true}}
});
const ruleOptions = [{validColors: Colors, customColors: extraFixColorsMap}];

const invalidStyleSheetExample = `StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '${Colors.grey30}'
  }
})
`;

const validStyleSheetExample = `StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: Colors.grey30
  }
})
`;

const invalidConditionalExpression = `const test = <Text style = {{ color: true ? '${Colors.grey10}' : '${Colors.grey20}'}}> </Text>;`;
const validConditionalExpression =
  'const test = <Text style = {{ color: true ? Colors.grey10 : Colors.grey20}}> </Text>;';

const invalidIdentifierExample = `
  const x = true ? '${Colors.grey10}' : '${Colors.grey20}'
  const test = <Text style = {{ color: x }}> </Text>;
`;
const validIdentifierExample = `
  const x = true ? Colors.grey10 : Colors.grey20
  const test = <Text style = {{ color: x }}> </Text>;
`;
const ruleTester = new RuleTester();

ruleTester.run('no-hard-coded-color', rule, {
  valid: [
    {code: 'const goodUsage = <Text style={{color: Constants.grey10}}/>;'},
    {code: 'const goodUsage = <View style={{backgroundColor: Constants.blue20}}/>;'}
  ],
  invalid: [
    {
      options: ruleOptions,
      code: `
      let x;
      let y;
      x = '#20303C';
      y = 3;
      const test = <Text style={{color: x}}>text</Text>;
      `,
      output: `
      let x;
      let y;
      x = Colors.grey10;
      y = 3;
      const test = <Text style={{color: x}}>text</Text>;
      `,
      errors: [{message: "Found '#20303C'. Use UILib colors instead of hardcoded colors."}]
    },
    {
      options: ruleOptions,
      code: `
      let x = 0;
      x = 1;
      x = '#20303C';
      const test = <Text style={{color: x}}>text</Text>;
      `,
      output: `
      let x = 0;
      x = 1;
      x = Colors.grey10;
      const test = <Text style={{color: x}}>text</Text>;
      `,
      errors: [{message: "Found '#20303C'. Use UILib colors instead of hardcoded colors."}]
    },
    {
      options: ruleOptions,
      code: invalidStyleSheetExample,
      output: validStyleSheetExample,
      errors: [{message: 'Found \'#66737C\'. Use UILib colors instead of hardcoded colors.'}]
    },
    {
      options: ruleOptions,
      code: invalidConditionalExpression,
      output: validConditionalExpression,
      errors: [
        {message: 'Found \'#20303C\'. Use UILib colors instead of hardcoded colors.'},
        {message: 'Found \'#43515C\'. Use UILib colors instead of hardcoded colors.'}
      ]
    },
    {
      options: ruleOptions,
      code: invalidIdentifierExample,
      output: validIdentifierExample,
      errors: [
        {message: 'Found \'#20303C\'. Use UILib colors instead of hardcoded colors.'},
        {message: 'Found \'#43515C\'. Use UILib colors instead of hardcoded colors.'}
      ]
    },
    {
      options: ruleOptions,
      code: `const badUsage = <Text style = {{ color: '${Colors.grey10}'}}> </Text>;`,
      output: 'const badUsage = <Text style = {{ color: Colors.grey10}}> </Text>;',
      errors: [{message: 'Found \'#20303C\'. Use UILib colors instead of hardcoded colors.'}]
    },
    {
      options: ruleOptions,
      code: 'const badUsage = <Text style={{color: \'#123456\'}}/>;',
      errors: [{message: 'Found \'#123456\'. Use UILib colors instead of hardcoded colors.'}]
    },
    {
      options: ruleOptions,
      code: `const badUsage = <Text style = {{ color: '${Colors.grey10.toLowerCase()}'}}> </Text>;`,
      output: 'const badUsage = <Text style = {{ color: Colors.grey10}}> </Text>;',
      errors: [{message: 'Found \'#20303c\'. Use UILib colors instead of hardcoded colors.'}]
    },
    {
      options: ruleOptions,
      code: 'const badUsage = <Text style = {{ color: \'#fff\'}}> </Text>;',
      output: 'const badUsage = <Text style = {{ color: Colors.white}}> </Text>;',
      errors: [{message: 'Found \'#fff\'. Use UILib colors instead of hardcoded colors.'}]
    },
    {
      options: [{...ruleOptions[0], dueDate: 'Thursday, 12 August'}],
      code: 'const badUsage = <Text style = {{ color: \'#ffffff\'}}> </Text>;',
      output: 'const badUsage = <Text style = {{ color: Colors.white}}> </Text>;',
      errors: [
        {
          message:
            'Found \'#ffffff\'. Use UILib colors instead of hardcoded colors. Please fix this issue by Thursday, 12 August!'
        }
      ]
    }
  ]
});
