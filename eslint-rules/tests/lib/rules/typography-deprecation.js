const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/typography-deprecation');
const deprecationsJson = require('../../typography_deprecation.json');


RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  parserOptions: {ecmaVersion: 6, ecmaFeatures: {jsx: true}},
});

const ruleTester = new RuleTester();

const ourSource = 'our-source';
const notOurSource = 'another-source';

const options = [{deprecations: deprecationsJson, source: ourSource}];
const optionsWithDate = [{deprecations: deprecationsJson, source: ourSource, dueDate: '2 November, Friday'}];

const ourImport = `import {Typography} from '${ourSource}';`
const ourImportRenamed = `import {Typography as UITypography} from '${ourSource}';`
const notOurImport = `import {Typography} from '${notOurSource}';`

const constValid1 = 'const typography = Typography.valid;';
const constValidRenamed1 = 'const typography = UITypography.valid;';
const constDeprecated1 = 'const typography = Typography.deprecated;';
const constDeprecatedRenamed1 = 'const typography = UITypography.deprecated;';

const constValid2 = 'const typography = <Text style={Typography.valid}>Title</Text>;';
const constValidRenamed2 = 'const typography = <Text style={UITypography.valid}>Title</Text>;';
const constDeprecated2 = 'const typography = <Text style={Typography.deprecated}>Title</Text>;';
const constDeprecatedRenamed2 = 'const typography = <Text style={UITypography.deprecated}>Title</Text>;';

const constValid3 = 'const typography = <Text valid>Title</Text>;';
const constDeprecated3 = 'const typography = <Text deprecated>Title</Text>;';

const styleSheetValid1 = `const styles = StyleSheet.create({text: {...Typography.valid}});`;
const styleSheetValidRenamed1 = `const styles = StyleSheet.create({text: {...UITypography.valid}});`;
const styleSheetDeprecated1 = `const styles = StyleSheet.create({text: {...Typography.deprecated}});`;
const styleSheetDeprecatedRenamed1 = `const styles = StyleSheet.create({text: {...UITypography.deprecated}});`;

const styleSheetValid2 = `const styles = StyleSheet.create({text: Typography.valid});`;
const styleSheetValidRenamed2 = `const styles = StyleSheet.create({text: UITypography.valid});`;
const styleSheetDeprecated2 = `const styles = StyleSheet.create({text: Typography.deprecated});`;
const styleSheetDeprecatedRenamed2 = `const styles = StyleSheet.create({text: UITypography.deprecated});`;

const jsxValid1 = '<Text style={Typography.valid}>Title</Text>';
const jsxValidRenamed1 = '<Text style={UITypography.valid}>Title</Text>';
const jsxDeprecated1 = '<Text style={Typography.deprecated}>Title</Text>';
const jsxDeprecatedRenamed1 = '<Text style={UITypography.deprecated}>Title</Text>';

const jsxValid2 = '<Text valid>Title</Text>';
const jsxDeprecated2 = '<Text deprecated>Title</Text>';

const jsxValid3 = '<View><Text style={Typography.valid}>Title</Text></View>';
const jsxValidRenamed3 = '<View><Text style={UITypography.valid}>Title</Text></View>';
const jsxDeprecated3 = '<View><Text style={Typography.deprecated}>Title</Text></View>';
const jsxDeprecatedRenamed3 = '<View><Text style={UITypography.deprecated}>Title</Text></View>';

const jsxValid4 = '<View><Text valid>Title</Text></View>';
const jsxDeprecated4 = '<View><Text deprecated>Title</Text></View>';

const fullClassValid = `
${ourImport}
class Example extends Component {

  render() {
    return (
      <View flex center>
        ${jsxValid1}
        ${jsxValid2}
        ${jsxValid3}
        ${jsxValid4}
      </View>
    );
  }
}`;

const fullClassValidRenamed = `
${ourImportRenamed}
class Example extends Component {

  render() {
    return (
      <View flex center>
        ${jsxValidRenamed1}
        ${jsxValid2}
        ${jsxValidRenamed3}
        ${jsxValid4}
      </View>
    );
  }
}`;

const fullClassDeprecated = `
${ourImport}
class Example extends Component {

  render() {
    return (
      <View flex center>
        ${jsxDeprecated1}
        ${jsxDeprecated2}
        ${jsxDeprecated3}
        ${jsxDeprecated4}
      </View>
    );
  }
}`;

const fullClassDeprecatedRenamed = `
${ourImportRenamed}
class Example extends Component {

  render() {
    return (
      <View flex center>
        ${jsxDeprecatedRenamed1}
        ${jsxDeprecated2}
        ${jsxDeprecatedRenamed3}
        ${jsxDeprecated4}
      </View>
    );
  }
}`;

const error = "'Typography.deprecated' is deprecated. Please use 'Typography.valid' instead (fix is available).";
const errorDate = ' Please fix this issue by 2 November, Friday!';

ruleTester.run('typography-deprecation', rule, {
  valid: [
    {
      options: options,
      code: `${notOurImport} ${constDeprecated1}`,
    },
    {
      options: options,
      code: `${ourImport} ${constValid1}`,
    },
    {
      options: options,
      code: `${ourImport} ${constValid2}`,
    },
    {
      options: options,
      code: `${ourImport} ${constValid3}`,
    },
    {
      options: options,
      code: `${ourImport} ${styleSheetValid1}`,
    },
    {
      options: options,
      code: `${ourImport} ${styleSheetValid2}`,
    },
    {
      options: options,
      code: `${ourImport} ${jsxValid1}`,
    },
    {
      options: options,
      code: `${ourImport} ${jsxValid2}`,
    },
    {
      options: options,
      code: `${jsxValid2}`,
    },
    {
      options: options,
      code: `${ourImport} ${jsxValid3}`,
    },
    {
      options: options,
      code: `${ourImport} ${jsxValid4}`,
    },
    {
      options: options,
      code: `${ourImport} ${jsxValid4}`,
    },
    {
      options: options,
      code: `${fullClassValid}`,
    },
    {
      options: options,
      code: `${ourImportRenamed} ${constValidRenamed1}`,
    },
    {
      options: options,
      code: `${ourImportRenamed} ${constValidRenamed2}`,
    },
    {
      options: options,
      code: `${ourImportRenamed} ${constValid3}`,
    },
    {
      options: options,
      code: `${ourImportRenamed} ${styleSheetValidRenamed1}`,
    },
    {
      options: options,
      code: `${ourImportRenamed} ${styleSheetValidRenamed2}`,
    },
    {
      options: options,
      code: `${ourImportRenamed} ${jsxValidRenamed1}`,
    },
    {
      options: options,
      code: `${ourImportRenamed} ${jsxValid2}`,
    },
    {
      options: options,
      code: `${ourImportRenamed} ${jsxValidRenamed3}`,
    },
    {
      options: options,
      code: `${ourImportRenamed} ${jsxValid4}`,
    },
    {
      options: options,
      code: `${ourImportRenamed} ${jsxValid4}`,
    },
    {
      options: options,
      code: `${fullClassValidRenamed}`,
    }
  ],
  invalid: [
    {
      options: options,
      code: `${ourImport} ${constDeprecated1}`,
      errors: [{message: error}]
    },
    {
      options: optionsWithDate,
      code: `${ourImport} ${constDeprecated1}`,
      errors: [{message: error + errorDate}]
    },
    {
      options: optionsWithDate,
      code: `${ourImport} ${constDeprecated2}`,
      errors: [{message: error + errorDate}]
    },
    {
      options: optionsWithDate,
      code: `${ourImport} ${constDeprecated3}`,
      errors: [{message: error + errorDate}]
    },
    {
      options: options,
      code: `${ourImport} ${styleSheetDeprecated1}`,
      errors: [{message: error}]
    },
    {
      options: options,
      code: `${ourImport} ${styleSheetDeprecated2}`,
      errors: [{message: error}]
    },
    {
      options: options,
      code: `${ourImport} ${jsxDeprecated1}`,
      errors: [{message: error}]
    },
    {
      options: options,
      code: `${ourImport} ${jsxDeprecated2}`,
      errors: [{message: error}]
    },
    {
      options: options,
      code: `${jsxDeprecated2}`,
      errors: [{message: error}]
    },
    {
      options: options,
      code: `${ourImport} ${jsxDeprecated3}`,
      errors: [{message: error}]
    },
    {
      options: options,
      code: `${ourImport} ${jsxDeprecated4}`,
      errors: [{message: error}]
    },
    {
      options: options,
      code: `${fullClassDeprecated}`,
      errors: [{message: error}, {message: error}, {message: error}, {message: error}]
    },
    {
      options: options,
      code: `${ourImportRenamed} ${constDeprecatedRenamed1}`,
      errors: [{message: error}]
    },
    {
      options: optionsWithDate,
      code: `${ourImportRenamed} ${constDeprecatedRenamed1}`,
      errors: [{message: error + errorDate}]
    },
    {
      options: optionsWithDate,
      code: `${ourImportRenamed} ${constDeprecatedRenamed2}`,
      errors: [{message: error + errorDate}]
    },
    {
      options: optionsWithDate,
      code: `${ourImportRenamed} ${constDeprecated3}`,
      errors: [{message: error + errorDate}]
    },
    {
      options: options,
      code: `${ourImportRenamed} ${styleSheetDeprecatedRenamed1}`,
      errors: [{message: error}]
    },
    {
      options: options,
      code: `${ourImportRenamed} ${styleSheetDeprecatedRenamed2}`,
      errors: [{message: error}]
    },
    {
      options: options,
      code: `${ourImportRenamed} ${jsxDeprecatedRenamed1}`,
      errors: [{message: error}]
    },
    {
      options: options,
      code: `${ourImportRenamed} ${jsxDeprecated2}`,
      errors: [{message: error}]
    },
    {
      options: options,
      code: `${ourImportRenamed} ${jsxDeprecatedRenamed3}`,
      errors: [{message: error}]
    },
    {
      options: options,
      code: `${ourImportRenamed} ${jsxDeprecated4}`,
      errors: [{message: error}]
    },
    {
      options: options,
      code: `${fullClassDeprecatedRenamed}`,
      errors: [{message: error}, {message: error}, {message: error}, {message: error}]
    }
  ],
});
