
const _ = require('lodash');
const Colors  = require('../../../../dist/style/colors').colorsPallete;
const invertedColorsDict = _.invert(Colors)
const rule = require('../../../lib/rules/no-hard-coded-color');
const RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
  parser: "babel-eslint",
  parserOptions: { ecmaVersion: 6, ecmaFeatures: { jsx: true } },
});

const ruleTester = new RuleTester();

ruleTester.run('no-hard-coded-color', rule, {
  valid: [
    { code: 'const goodUsage = <Text style={{color: Constants.dark10}}/>;' },
    { code: 'const goodUsage = <View style={{backgroundColor: Constants.blue20}}/>;' },
  ],
  invalid: [
    {
      code: `const badUsage = <Text style = {{ color: \'${Colors.dark10}\'}}> </Text>;`,
      output: `const badUsage = <Text style = {{ color: Colors.dark10}}> </Text>;`,
      parserOptions: { ecmaVersion: 6, ecmaFeatures: { jsx: true } },
      errors: [
          { message: "Use UILib colors instead of hardcoded colors." }
      ] 
    },
    {
      code: 'const badUsage = <Text style={{color: \'#123456\'}}/>;',
      parserOptions: { ecmaVersion: 6, ecmaFeatures: { jsx: true } },
      errors: [
          { message: "Use UILib colors instead of hardcoded colors." }
      ]
    },
  ],
});
