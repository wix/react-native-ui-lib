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
    { code: 'const goodUsage = <Text style={{color: \'red\'}}/>;' },
    { code: 'const goodUsage = <Text style={{fontSize: Typography.text10.fontSize}}/>;' },
  ],
  invalid: [
    {
      code: 'const badUsage = <Text style={{fontSize: 15}}/>;',
      errors: [
        {
          messageId: 'foo',
        },
      ],
    },
    {
      code: 'const badUsage = <Text style={{fontSize: Constants.isAndroid ? 16 : 17}}/>;',
      errors: [
        {
          messageId: 'foo',
        },
      ],
    },
    {
      code: 'const badUsage = <Text style={{fontSize: size}}/>;',
      errors: [
        {
          messageId: 'foo',
        },
      ],
    },
  ],
});
