const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/assets-deprecation');
const deprecationsJson = require('../../assets_deprecation.json');


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

const ourImport = `import {Assets} from '${ourSource}';`
const ourImportRenamed = `import {Assets as UIAssets} from '${ourSource}';`
const notOurImport = `import {Assets} from '${notOurSource}';`

const constValid1 = 'const assets = Assets.icons.general.valid;';
const constValidRenamed1 = 'const assets = UIAssets.icons.general.valid;';
const constDeprecated1 = 'const assets = Assets.icons.deprecated;';
const constDeprecatedRenamed1 = 'const assets = UIAssets.icons.deprecated;';

const constValid2 = 'const assets = <Button iconSource={Assets.icons.general.valid}/>;';
const constValidRenamed2 = 'const assets = <Button iconSource={UIAssets.icons.general.valid}/>;';
const constDeprecated2 = 'const assets = <Button iconSource={Assets.icons.deprecated}/>;';
const constDeprecatedRenamed2 = 'const assets = <Button iconSource={UIAssets.icons.deprecated}/>;';

const jsx1 = '<Button {...others}/>';
const jsxValid1 = 'const others = {iconSource: Assets.icons.general.valid};';
const jsxValidRenamed1 = 'const others = {iconSource: UIAssets.icons.general.valid};';
const jsxDeprecated1 = 'const others = {iconSource: Assets.icons.deprecated};';
const jsxDeprecatedRenamed1 = 'const others = {iconSource: UIAssets.icons.deprecated};';

const jsxValid2 = '<Button iconSource={Assets.icons.general.valid}/>';
const jsxValidRenamed2 = '<Button iconSource={UIAssets.icons.general.valid}/>';
const jsxDeprecated2 = '<Button iconSource={Assets.icons.deprecated}/>';
const jsxDeprecatedRenamed2 = '<Button iconSource={UIAssets.icons.deprecated}/>';

const jsxValid3 = '<View><Button iconSource={Assets.icons.general.valid}/></View>';
const jsxValidRenamed3 = '<View><Button iconSource={UIAssets.icons.general.valid}/></View>';
const jsxDeprecated3 = '<View><Button iconSource={Assets.icons.deprecated}/></View>';
const jsxDeprecatedRenamed3 = '<View><Button iconSource={UIAssets.icons.deprecated}/></View>';

const jsxValid4 = 'const others = {iconSource: Assets.icons.general.valid}; const test = <Button {...others}/>';
const jsxValidRenamed4 = 'const others = {iconSource: UIAssets.icons.general.valid}; const test = <Button {...others}/>';
const jsxDeprecated4 = 'const others = {iconSource: Assets.icons.deprecated}; const test = <Button {...others}/>';
const jsxDeprecatedRenamed4 = 'const others = {iconSource: UIAssets.icons.deprecated}; const test = <Button {...others}/>';

const fullClassValid = `
${ourImport}
${jsxValid1}
class Example extends Component {

  render() {
    return (
      <View flex center>
        ${jsx1}
        ${jsxValid2}
        ${jsxValid3}
      </View>
    );
  }
}`;

const fullClassValidRenamed = `
${ourImportRenamed}
${jsxValidRenamed1}
class Example extends Component {

  render() {
    return (
      <View flex center>
        ${jsx1}
        ${jsxValidRenamed2}
        ${jsxValidRenamed3}
      </View>
    );
  }
}`;

const fullClassDeprecated = `
${ourImport}
${jsxDeprecated1}
class Example extends Component {

  render() {
    return (
      <View flex center>
        ${jsx1}
        ${jsxDeprecated2}
        ${jsxDeprecated3}
      </View>
    );
  }
}`;

const fullClassDeprecatedRenamed = `
${ourImportRenamed}
${jsxDeprecatedRenamed1}
class Example extends Component {

  render() {
    return (
      <View flex center>
        ${jsx1}
        ${jsxDeprecatedRenamed2}
        ${jsxDeprecatedRenamed3}
      </View>
    );
  }
}`;

const fullClassTest1 = `
import {Something} from '${notOurSource}';
${ourImport}
import {SomethingElse} from '${notOurSource2}';
  
const validIcon = (icon) => (typeof icon === 'number' ? icon : undefined);

class Example extends React.Component {
  renderComponent1() {
    return this.props.list.map((item) => (
      <Component1
        prop1={item.data1}
        prop2={item.data2}
        prop3={item.data3}
        prop4={item.data4}
      />
    ));
  }

  render() {
    return (
      <Component2 prop5={this.props.prop5}>
        <ScrollView contentContainerStyle={{paddingBottom: 10}}>
          {this.renderComponent1()}
          <List.Item
            prop6={this.props.prop6}
            prop7={this.props.prop7}
            prop8={this.props.prop8}
            prop9={this.props.prop9}
            icon={validIcon(Assets.icons.deprecated)}
          />
        </ScrollView>
        <Component3
          prop10={this.props.prop10}
          prop11={this.props.prop11}
          prop12={this.props.prop12}
        />
      </Component2>
    );
  }
}

export default Example;`;

const fullClassTest2 = `
import * as LetsImportEverything from '${ourSource}';

const {Assets}: typeof LetsImportEverything = require('${ourSource}');

const validIcon = (icon) => (typeof icon === 'number' ? icon : undefined);

class Example extends React.Component {
  renderComponent1() {
    return this.props.list.map((item) => (
      <Component1
        prop1={item.data1}
        prop2={item.data2}
        prop3={item.data3}
        prop4={item.data4}
      />
    ));
  }

  render() {
    return (
      <Component2 prop5={this.props.prop5}>
        <ScrollView contentContainerStyle={{paddingBottom: 10}}>
          {this.renderComponent1()}
          <List.Item
            prop6={this.props.prop6}
            prop7={this.props.prop7}
            prop8={this.props.prop8}
            prop9={this.props.prop9}
            icon={validIcon(Assets.icons.deprecated)}
          />
        </ScrollView>
        <Component3
          prop10={this.props.prop10}
          prop11={this.props.prop11}
          prop12={this.props.prop12}
        />
      </Component2>
    );
  }
}

export default Example;`;

const error = "'Assets.icons.deprecated' is deprecated. Please use 'Assets.icons.general.valid' instead (fix is available).";
const errorDate = ' Please fix this issue by 2 November, Friday!';

ruleTester.run('assets-deprecation', rule, {
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
      code: `${ourImport} ${jsxValid1} ${jsx1}`,
    },
    {
      options: options,
      code: `${ourImport} ${jsxValid2}`,
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
      code: `${ourImportRenamed} ${jsxValidRenamed1} ${jsx1}`,
    },
    {
      options: options,
      code: `${ourImportRenamed} ${jsxValidRenamed2}`,
    },
    {
      options: options,
      code: `${ourImportRenamed} ${jsxValidRenamed3}`,
    },
    {
      options: options,
      code: `${ourImportRenamed} ${jsxValidRenamed4}`,
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
      options: options,
      code: `${ourImport} ${jsxDeprecated1} ${jsx1}`,
      errors: [{message: error}]
    },
    {
      options: options,
      code: `${ourImport} ${jsxDeprecated2}`,
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
      errors: [{message: error}, {message: error}, {message: error}]
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
      options: options,
      code: `${ourImportRenamed} ${jsxDeprecatedRenamed1} ${jsx1}`,
      errors: [{message: error}]
    },
    {
      options: options,
      code: `${ourImportRenamed} ${jsxDeprecatedRenamed2}`,
      errors: [{message: error}]
    },
    {
      options: options,
      code: `${ourImportRenamed} ${jsxDeprecatedRenamed3}`,
      errors: [{message: error}]
    },
    {
      options: options,
      code: `${ourImportRenamed} ${jsxDeprecatedRenamed4}`,
      errors: [{message: error}]
    },
    {
      options: options,
      code: `${fullClassDeprecatedRenamed}`,
      errors: [{message: error}, {message: error}, {message: error}]
    },
    {
      options: options,
      code: `${fullClassTest1}`,
      errors: [{message: error}]
    },
    {
      options: options,
      code: `${fullClassTest2}`,
      errors: [{message: error}]
    },
    {
      options: options,
      code: `
function createImages() {
  const IDs1 = require('my-ids-1');
  const {Assets} = require('${ourSource}');
  const IDs2 = require('my-ids-2');

  const images = {};
  images[IDs1.ID1] = Assets.icons.valid;
  images[IDs1.ID2] = Assets.icons.deprecated;
  images[IDs1.ID3] = Assets.icons.general.valid;
  images[IDs1.ID4] = require('../../images/image1.png');
  images[IDs2.ID5] = require('../../images/image2.png');
  images[IDs2.ID6] = Assets.icons.general.valid2;
  images[IDs2.ID7] = Assets.icons.valid2;
  return images;
}`,
      errors: [{message: error}]
    },
    {
      options: options,
      code: `
${ourImport}

const props = {
  title: 'title',
  subtitle: 'subtitle',
  icon: Assets.icons.deprecated
};`,
      errors: [{message: error}]
    },
    {
      options: options,
      code: `
${ourImport}

const props = {
  title: 'title',
  subtitle: 'subtitle',
  icon: Assets.icons['deprecated']
};`,
      errors: [{message: error}]
    },
// TODO: ¯\_(ツ)_/¯
//     {
//       options: options,
//       code: `
// ${ourImport}

// const data = 'deprecated';
// const props = {
//   title: 'title',
//   subtitle: 'subtitle',
//   icon: Assets.icons[data]
// };`,
//       errors: [{message: error}]
//     },
//     {
//       options: options,
//       code: `
// ${ourImport}

// function getAsset() {
//   const result = 'deprecated';
//   return result;
// }

// const props = {
//   title: 'title',
//   subtitle: 'subtitle',
//   icon: Assets.icons[getAsset()]
// };`,
//       errors: [{message: error}]
//     }
  ],
});
