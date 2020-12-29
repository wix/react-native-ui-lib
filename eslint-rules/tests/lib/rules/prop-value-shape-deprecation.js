const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/prop-value-shape-deprecation');
const deprecationsJson = require('../../prop-value-shape-deprecation.json');

RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  parserOptions: {ecmaVersion: 6, ecmaFeatures: {jsx: true}}
});

const ruleTester = new RuleTester();

const ruleOptions = [{deprecations: deprecationsJson}];
const PassedPropExampleCode = `
  const myProps = {
    goodProp: goodValue,
    imageSource: {uri: some_uri}
  };

  <Label avatar={myProps}/>
`;
const PassedPropExampleOutput = `
  const myProps = {
    goodProp: goodValue,
    source: {uri: some_uri}
  };

  <Label avatar={myProps}/>
`;

const firstLevelSpreadCode = `
const myProps = {
  avatarProps: {
    goodProp: goodValue,
    imageSource: {uri: some_uri}
  }
};

<Label goodProp={'goodValue'} {...myProps}/>
`;

const firstLevelSpreadOutput = `
const myProps = {
  avatarProps: {
    goodProp: goodValue,
    source: {uri: some_uri}
  }
};

<Label goodProp={'goodValue'} {...myProps}/>
`;

const secondLevelSpreadCode = `
const myProps = {
  goodProp: goodValue,
  imageSource: {uri: some_uri}
};

<Label avatar={{goodProp: goodValue, ...myProps}}/>
`;

const secondLevelSpreadOutput = `
const myProps = {
  goodProp: goodValue,
  source: {uri: some_uri}
};

<Label avatar={{goodProp: goodValue, ...myProps}}/>
`;


ruleTester.run('prop-value-shape-deprecation', rule, {
  valid: [
    {
      options: ruleOptions,
      code: '<ListItem avatar={{source: {uri: some_uri}}}/>'
    }
  ],
  invalid: [
    {
      options: ruleOptions,
      code: '<ListItem avatar={{imageSource: {uri: some_uri}, someProp: someValue}}/>',
      errors: [{message: `The shape of 'avatar' prop of 'ListItem' doesn't contain 'imageSource' anymore. Please use 'source' instead (fix is available).`}],
      output: '<ListItem avatar={{source: {uri: some_uri}, someProp: someValue}}/>'
    },
    {
      options: ruleOptions,
      code: '<ListItem avatar={{someProp: someValue, imageSource: {uri: some_uri}}}/>',
      errors: [{message: `The shape of 'avatar' prop of 'ListItem' doesn't contain 'imageSource' anymore. Please use 'source' instead (fix is available).`}],
      output: '<ListItem avatar={{someProp: someValue, source: {uri: some_uri}}}/>'
    },
    {
      options: ruleOptions,
      code: '<ListItem someProp={someValue} avatar={{imageSource: {uri: some_uri}}}/>',
      errors: [{message: `The shape of 'avatar' prop of 'ListItem' doesn't contain 'imageSource' anymore. Please use 'source' instead (fix is available).`}],
      output: '<ListItem someProp={someValue} avatar={{source: {uri: some_uri}}}/>'
    },
    {
      options: ruleOptions,
      code: PassedPropExampleCode,
      errors: [{message: `The shape of 'avatar' prop of 'Label' doesn't contain 'imageSource' anymore. Please use 'source' instead (fix is available).`}],
      output: PassedPropExampleOutput
    },
    {
      options: ruleOptions,
      code: firstLevelSpreadCode,
      errors: [{message: `The shape of 'avatarProps' prop of 'Label' doesn't contain 'imageSource' anymore. Please use 'source' instead (fix is available).`}],
      output: firstLevelSpreadOutput
    },
    {
      options: ruleOptions,
      code: secondLevelSpreadCode,
      errors: [{message: `The shape of 'avatar' prop of 'Label' doesn't contain 'imageSource' anymore. Please use 'source' instead (fix is available).`}],
      output: secondLevelSpreadOutput
    }
  ]
});
