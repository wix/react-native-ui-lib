const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/function-deprecation');
const deprecationsJson = require('../../function_deprecation.json');


RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  parserOptions: {ecmaVersion: 6, ecmaFeatures: {jsx: true}},
});

const ruleTester = new RuleTester();

const ourSource = 'our-source';
const notOurSource = 'another-source';
const notOurSource2 = 'another-source-2';

const options = [{deprecations: deprecationsJson, source: ourSource}];
const optionsWithDate = [{deprecations: deprecationsJson, source: ourSource, dueDate: '2 November, Friday'}];

const notOurFunctionImport = `import {deprecatedFunction} from '${notOurSource}';`
const validFunctionImport = `import {validFunction} from '${ourSource}';`
const validFunctionRenamedImport = `import {validFunction as validFunctionRenamed} from '${ourSource}';`
const deprecatedFunctionImport = `import {deprecatedFunction} from '${ourSource}';`

const validProps = `{validProp: "I'm valid!", validProp2: "I'm not deprecated, so I'm valid as well"}`;
const deprecatedProps = `{deprecatedProp: "I'm deprecated :(", validProp2: "I'm not deprecated, so I'm valid as well"}`;

const onPress = functionCall => `const onPress = () => {${functionCall}};`;

const fullClassValid = `
${validFunctionImport}
class Example extends Component {

  onPress = () => {
    validFunction(${validProps});
    validFunction(${deprecatedProps}, ${validProps});
  }

  render() {
    return (
      <TouchableOpacity flex center>
        {validFunction(${validProps})}
        {validFunction(${deprecatedProps}, ${validProps})}
        onPress={this.onPress}
      </TouchableOpacity>
    );
  }
}`;

const fullClassDeprecated1 = `
import {Something} from '${notOurSource}';
import {deprecatedFunction as someFunction, validFunction} from '${ourSource}';
import {SomethingElse} from '${notOurSource2}';
class Example extends Component {

  onPress = () => {
    validFunction(${validProps});
    validFunction(${validProps}, ${deprecatedProps});
    someFunction(${validProps});
    someFunction(${deprecatedProps}, ${validProps});
  }

  render() {
    return (
      <TouchableOpacity flex center>
      {validFunction(${validProps})}
      {validFunction(${validProps}, ${deprecatedProps})}
      {someFunction(${validProps})}
      {someFunction(${deprecatedProps}, ${validProps})}
        onPress={this.onPress}
      </TouchableOpacity>
    );
  }
}`;

const fullClassDeprecated2 = `
import {Something} from '${notOurSource}';
import * as Everything from '${ourSource}';
import {SomethingElse} from '${notOurSource2}';
class Example extends Component {

  onPress = () => {
    Everything.validFunction(${validProps});
    Everything.validFunction(${validProps}, ${deprecatedProps});
    Everything.deprecatedFunction(${validProps});
    Everything.deprecatedFunction(${deprecatedProps}, ${validProps});
  }

  render() {
    return (
      <TouchableOpacity flex center>
      {Everything.validFunction(${validProps})}
      {Everything.validFunction(${validProps}, ${deprecatedProps})}
      {Everything.deprecatedFunction(${validProps})}
      {Everything.deprecatedFunction(${deprecatedProps}, ${validProps})}
        onPress={this.onPress}
      </TouchableOpacity>
    );
  }
}`;

const functionError = "The 'deprecatedFunction' function is deprecated. Please use the 'validFunction' function instead (fix is available).";
const propError = "The 'validFunction' function's prop 'deprecatedProp' is deprecated. Please use the 'validProp' prop instead (fix is available).";
const errorDate = ' Please fix this issue by 2 November, Friday!';

ruleTester.run('function-deprecation', rule, {
  valid: [
    {
      options: options,
      code: `${notOurFunctionImport} deprecatedFunction(${validProps});`
    },
    {
      options: options,
      code: `${notOurFunctionImport} ${onPress(`deprecatedFunction(${validProps})`)}`
    },
    {
      options: options,
      code: `${notOurFunctionImport} deprecatedFunction(${deprecatedProps}, ${deprecatedProps});`
    },
    {
      options: options,
      code: `${notOurFunctionImport} ${onPress(`deprecatedFunction(${deprecatedProps})`)}`
    },
    {
      options: options,
      code: `${validFunctionImport} validFunction(${validProps});`
    },
    {
      options: options,
      code: `${validFunctionImport} validFunction(${deprecatedProps}, ${validProps});`
    },
    {
      options: options,
      code: `${validFunctionImport} ${onPress(`validFunction(${validProps})`)}`
    },
    {
      options: options,
      code: `${validFunctionRenamedImport} validFunctionRenamed(${validProps});`
    },
    {
      options: options,
      code: `${validFunctionRenamedImport} ${onPress(`validFunctionRenamed(${validProps})`)}`
    },
    {
      options: optionsWithDate,
      code: `${validFunctionImport} validFunction(${validProps});`
    },
    {
      options: optionsWithDate,
      code: `${validFunctionRenamedImport} ${onPress(`validFunctionRenamed(${validProps})`)}`
    },
    {
      options: options,
      code: `${validFunctionImport} validFunction();`
    },
    {
      options: options,
      code: `import * as Everything from '${ourSource}'; Everything.validFunction(${deprecatedProps}, ${validProps});`,
    },
    {
      options: options,
      code: `import * as Everything from '${notOurSource}'; Everything.deprecatedFunction(${validProps});`,
    },
    {
      options: options,
      code: `${fullClassValid}`,
    },
  ],
  invalid: [
    {
      options: options,
      code: `${deprecatedFunctionImport} deprecatedFunction(${validProps})`,
      errors: [{message: functionError}, {message: functionError}]
    },
    {
      options: options,
      code: `${validFunctionImport} validFunction(${deprecatedProps}, ${deprecatedProps});`,
      errors: [{message: propError}]
    },
    {
      options: options,
      code: `
import {Something as deprecatedFunction, deprecatedFunction as someFunction, SomethingElse, validFunction} from '${ourSource}';
someFunction(${validProps});
validFunction(${validProps}, ${deprecatedProps});`,
      errors: [{message: functionError}, {message: functionError}, {message: propError}]
    },
    {
      options: options,
      code: `
import {Something} from '${notOurSource}';
import {deprecatedFunction as someFunction, validFunction} from '${ourSource}';
import {SomethingElse} from '${notOurSource2}';
someFunction(${validProps});
validFunction(${validProps}, ${deprecatedProps});`,
      errors: [{message: functionError}, {message: functionError}, {message: propError}]
    },
    {
      options: optionsWithDate,
      code: `
import {Something as deprecatedFunction, deprecatedFunction as someFunction, SomethingElse, validFunction} from '${ourSource}';
someFunction(${validProps});`,
      errors: [{message: functionError + errorDate}, {message: functionError + errorDate}]
    },
    {
      options: optionsWithDate,
      code: `
import {Something as deprecatedFunction, deprecatedFunction as someFunction, SomethingElse, validFunction} from '${ourSource}';
validFunction(${validProps}, ${deprecatedProps});`,
      errors: [{message: functionError + errorDate}, {message: propError + errorDate}]
    },
    {
      options: options,
      code: `
import {deprecatedFunction as validFunction, SomethingElse} from '${ourSource}';
validFunction(${validProps});`,
      errors: [{message: functionError}, {message: functionError}]
    },
    {
      options: options,
      code: `import * as Everything from '${ourSource}'; Everything.deprecatedFunction(${validProps});`,
      errors: [{message: functionError}]
    },
    {
      options: options,
      code: `import * as Everything from '${ourSource}'; Everything.validFunction(${validProps}, ${deprecatedProps});`,
      errors: [{message: propError}]
    },
    {
      options: options,
      code: `
${deprecatedFunctionImport}
const props = ${validProps};
deprecatedFunction(props)`,
      errors: [{message: functionError}, {message: functionError}]
    },
    {
      options: options,
      code: `
${deprecatedFunctionImport}
function getProps() {
  return ${validProps};
}
deprecatedFunction(getProp())`,
      errors: [{message: functionError}, {message: functionError}]
    },
    {
      options: options,
      code: `${fullClassDeprecated1}`,
      errors: [
        { message: functionError },
        { message: propError },
        { message: functionError },
        { message: functionError },
        { message: propError },
        { message: functionError },
        { message: functionError },
      ],
    },
    {
      options: options,
      code: `${fullClassDeprecated2}`,
      errors: [
        { message: propError },
        { message: functionError },
        { message: functionError },
        { message: propError },
        { message: functionError },
        { message: functionError },
      ],
    },
  ],
});
