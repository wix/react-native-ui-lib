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
const notOurSource2 = 'another-source-2';

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

const fullClassTest1 = `
import {Something} from '${notOurSource}';
${ourImport}
import {SomethingElse} from '${notOurSource2}';
  
const validTypography = (typography) => (myLogic(typography) ? typography : undefined);

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
            labelStyle={validTypography(Typography.deprecated)}
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

const {Typography}: typeof LetsImportEverything = require('${ourSource}');

const validTypography = (typography) => (myLogic(typography) ? typography : undefined);

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
            labelStyle={validTypography(Typography.deprecated)}
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
    },
    {
      options: options,
      code: `
          ${ourImport}
          import {List} from 'another-source';
          <List.Item title={'bla'} />`
    },
    {
      options: options,
      code: `
        import React, {Component} from 'react';
        import {Typography} from 'our-source';
        import {List} from 'another-source';
        export default class OurList extends Component {
          render() {
            const titleVal = 'bla';
            return (
              <List.Item title={titleVal}/>
            )
          }
        }`
    },
    {
      options: options,
      code: `
        import React, {Component} from 'react';
        import {Typography, List} from 'our-source';
        export default class OurList extends Component {
          render() {
            const titleVal = 'bla';
            return (
              <List.Item title={titleVal}/>
            )
          }
        }`
    },
    {
      options: options,
      code: `
        import React, {Component} from 'react';
        import {Typography, List} from 'our-source';
        export default class OurList extends Component {
          render() {
            const titleVal = this.props.title;
            const subtitleVal = this.props.subtitle;
            return (
              <List.Item title={titleVal} subtitle={subtitleVal}/>
            )
          }
        }`
    },
    {
      options: options,
      code: `
        import React, {Component} from 'react';
        import {Typography, List} from 'our-source';
        export default class OurList extends Component {
          render() {
            const {title, subtitle} = this.props;
            return (
              <List.Item title={title} subtitle={subtitle}/>
            )
          }
        }`
    },
    {
      options: options,
      code: `
        import React, {Component} from 'react';
        import {Typography, List} from 'our-source';
        export default class OurList extends Component {
          render() {
            const {title: titleVal, subtitle: subtitleVal} = this.props;
            return (
              <List.Item title={titleVal} subtitle={subtitleVal}/>
            )
          }
        }`,
        errors: [{message: `'Typography.title' is deprecated. Please use 'Typography.heading' instead (fix is available).`}]
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
        import React, {Component} from 'react';
        import {Typography, Text} from 'our-source';
        export default class OurList extends Component {
          render() {
            const titleVal = true;
            return (
              <Text title={titleVal}/>
            )
          }
        }`,
        errors: [{message: `'Typography.title' is deprecated. Please use 'Typography.heading' instead (fix is available).`}]
    },
    {
      options: options,
      code: `
        import React, {Component} from 'react';
        import {Typography, Text} from 'our-source';
        export default class OurList extends Component {
          render() {
            const {isTitle} = this.props;
            const titleVal = this.props.isTitle;
            const subtitleVal = !this.props.isTitle;
            return (
              <Text title={titleVal} subtitle={subtitleVal}/>
            )
          }
        }`,
        errors: [{message: `'Typography.title' is deprecated. Please use 'Typography.heading' instead (fix is available).`}]
    },
    {
      options: options,
      code: `
        import React, {Component} from 'react';
        import {Typography, Text} from 'our-source';
        export default class OurList extends Component {
          render() {
            const {isTitle} = this.props;
            const titleVal = isTitle;
            const subtitleVal = !isTitle;
            return (
              <Text title={titleVal} subtitle={subtitleVal}/>
            )
          }
        }`,
        errors: [{message: `'Typography.title' is deprecated. Please use 'Typography.heading' instead (fix is available).`}]
    },
    {
      options: options,
      code: `
        import React, {Component} from 'react';
        import {Typography, TextField} from 'our-source';
        export default class OurList extends Component {
          render() {
            const titleVal = true;
            return (
              <TextField title={titleVal}/>
            )
          }
        }`,
        errors: [{message: `'Typography.title' is deprecated. Please use 'Typography.heading' instead (fix is available).`}]
    },
    {
      options: options,
      code: `
        import React, {Component} from 'react';
        import {Typography, TextField} from 'our-source';
        export default class OurList extends Component {
          render() {
            const {isTitle} = this.props;
            const titleVal = this.props.isTitle;
            const subtitleVal = !this.props.isTitle;
            return (
              <TextField title={titleVal} subtitle={subtitleVal}/>
            )
          }
        }`,
        errors: [{message: `'Typography.title' is deprecated. Please use 'Typography.heading' instead (fix is available).`}]
    },
    {
      options: options,
      code: `
        import React, {Component} from 'react';
        import {Typography, TextField} from 'our-source';
        export default class OurList extends Component {
          render() {
            const {isTitle} = this.props;
            const titleVal = isTitle;
            const subtitleVal = !isTitle;
            return (
              <TextField title={titleVal} subtitle={subtitleVal}/>
            )
          }
        }`,
        errors: [{message: `'Typography.title' is deprecated. Please use 'Typography.heading' instead (fix is available).`}]
    },
    // TODO: these tests are not currently supported, they might be supported when prop-value-shape-deprecation is merged (or we'll have to add support)
    // {
    //   options: options,
    //   code: `
    //     import React, {Component} from 'react';
    //     import {Typography, Button} from 'our-source';
    //     export default class OurList extends Component {
    //       render() {
    //         const titleVal = true;
    //         return (
    //           <Button labelProps={{title: titleVal}}/>
    //         )
    //       }
    //     }`,
    //     errors: [{message: `'Typography.title' is deprecated. Please use 'Typography.heading' instead (fix is available).`}]
    // },
    // {
    //   options: options,
    //   code: `
    //     import React, {Component} from 'react';
    //     import {Typography, Button} from 'our-source';
    //     export default class OurList extends Component {
    //       render() {
    //         const titleVal = true;
    //         return (
    //           <Button title={titleVal}/>
    //         )
    //       }
    //     }`,
    //     errors: [{message: `'Typography.title' is deprecated. Please use 'Typography.heading' instead (fix is available).`}]
    // },
    // {
    //   options: options,
    //   code: `
    //     import React, {Component} from 'react';
    //     import {Typography, Card} from 'our-source';
    //     export default class OurList extends Component {
    //       render() {
    //         const titleVal = true;
    //         return (
    //           <Card.Section content={{title: titleVal}}/>
    //         )
    //       }
    //     }`,
    //     errors: [{message: `'Typography.title' is deprecated. Please use 'Typography.heading' instead (fix is available).`}]
    // },
    // {
    //   options: options,
    //   code: `
    //     import React, {Component} from 'react';
    //     import {Typography, TabBar} from 'our-source';
    //     export default class OurList extends Component {
    //       render() {
    //         const titleVal = true;
    //         return (
    //           <TabBar labelStyle={{title: titleVal}} selectedLabelStyle={{title: titleVal}}/>
    //         )
    //       }
    //     }`,
    //     errors: [{message: `'Typography.title' is deprecated. Please use 'Typography.heading' instead (fix is available).`}]
    // },
    // {
    //   options: options,
    //   code: `
    //     import React, {Component} from 'react';
    //     import {Typography, Label} from 'our-source';
    //     export default class OurList extends Component {
    //       render() {
    //         const titleVal = true;
    //         return (
    //           <Label labelProps={{title: titleVal}}/>
    //         )
    //       }
    //     }`,
    //     errors: [{message: `'Typography.title' is deprecated. Please use 'Typography.heading' instead (fix is available).`}]
    // },
    // TODO: this is not currently supported, it should be easily supported after the new utils are added
    // {
    //   options: options,
    //   code: `
    //     import React, {Component} from 'react';
    //     import {Typography, Text as T} from 'our-source';
    //     export default class OurList extends Component {
    //       render() {
    //         const titleVal = true;
    //         return (
    //           <T title={titleVal}/>
    //         )
    //       }
    //     }`,
    //     errors: [{message: `'Typography.title' is deprecated. Please use 'Typography.heading' instead (fix is available).`}]
    // },
  ],
});
