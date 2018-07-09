const rule = require('../../../lib/rules/no-hard-coded-font');
const RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
});

const ruleTester = new RuleTester();

ruleTester.run('no-hard-coded-font', rule, {
  valid: [
    {code: 'const goodUsage = <Text style={{fontSize: Typography.text10.fontSize}}/>;'},
    {code: 'const goodUsage = <View style={{...Typography.text10}}/>;'}
  ],
  invalid: [
    {
      // fontWeight as a string
      code: 'const badUsage = <Text style={{fontWeight: \'100\'}}/>;',
      errors: [
        {message: 'Found value \'100\' in font style prop. Use UILib typography instead of hardcoded font styles.'}
      ],
    },
    {
      // fontSize as a number
      code: 'const badUsage = <Text style={{fontSize: 24}}/>;',
      errors: [
        {message: 'Found value \'24\' in font style prop. Use UILib typography instead of hardcoded font styles.'}
      ],
    },
    {
      // fontSize as a trinry
      code: 'const badUsage = <Text style={{fontSize: isAndroid ? 16 : 17}}/>;',
      errors: [
        {message: 'Found value \'16\' in font style prop. Use UILib typography instead of hardcoded font styles.'},
        {message: 'Found value \'17\' in font style prop. Use UILib typography instead of hardcoded font styles.'}
      ],
    },
    {
      // fontSize as a string variable
      code: 'const size = 22; const badUsage = <Text style={{fontSize: size}}/>;',
      errors: [
        {message: 'Found value \'22\' in font style prop. Use UILib typography instead of hardcoded font styles.'}
      ],
    },
  ],
});
