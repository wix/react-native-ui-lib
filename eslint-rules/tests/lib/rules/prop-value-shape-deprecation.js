const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/prop-value-shape-deprecation');
const deprecationsJson = require('../../prop-value-shape-deprecation.json');
const fs = require('fs');
const bigExampleValid = fs.readFileSync('../demo/src/screens/componentScreens/ChipScreen.tsx', 'utf8');
const bigExampleError = fs.readFileSync('../demo/src/screens/componentScreens/PickerScreen.js', 'utf8');

RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  parserOptions: {ecmaVersion: 6, ecmaFeatures: {jsx: true}}
});

const ruleTester = new RuleTester();
const imageSource = 'imageSource: {uri: some_uri}';
const source = 'source: {uri: some_uri}';
const ruleOptions = [{deprecations: deprecationsJson}];
const PassedPropExampleCode = `
import {Label} from 'our-source';
const myProps = {
  goodProp: goodValue,
  ${imageSource}
};

<Label avatar={myProps}/>
`;
const PassedPropExampleOutput = `
import {Label} from 'our-source';
const myProps = {
  goodProp: goodValue,
  ${source}
};

<Label avatar={myProps}/>
`;

const firstLevelSpreadCode = `
import {Label} from 'our-source';
const myProps = {
  avatarProps: {
    goodProp: goodValue,
    ${imageSource}
  }
};

<Label goodProp={'goodValue'} {...myProps}/>
`;

const firstLevelSpreadOutput = `
import {Label} from 'our-source';
const myProps = {
  avatarProps: {
    goodProp: goodValue,
    ${source}
  }
};

<Label goodProp={'goodValue'} {...myProps}/>
`;

const secondLevelSpreadCode = `
import {Label} from 'our-source';
const myProps = {
  goodProp: goodValue,
  ${imageSource}
};

<Label avatar={{goodProp: goodValue, ...myProps}}/>
`;

const secondLevelSpreadOutput = `
import {Label} from 'our-source';
const myProps = {
  goodProp: goodValue,
  ${source}
};

<Label avatar={{goodProp: goodValue, ...myProps}}/>
`;

const deprecationWithoutFix = `import React, {Component} from 'react';
import {ListItem} from 'our-source';
class NewFeature extends Component {
  render () {
    return (
      <ListItem thumbnail={{useCustomTheme: true}}/>
    )
  };
}`;

ruleTester.run('prop-value-shape-deprecation', rule, {
  valid: [
    {
      options: ruleOptions,
      code: `<ListItem avatar={{${source}}}/>`
    },
    {
      options: ruleOptions,
      code: `<ListItem avatar={{someProp: goodValue, ${source}}}/>`
    },
    {
      options: ruleOptions,
      code: `<ListItem goodProp={{${imageSource}}} avatar={{${source}}}/>`
    },
    {
      options: ruleOptions,
      code: bigExampleValid
    }
  ],
  invalid: [
    {
      options: ruleOptions,
      code: `import {ListItem} from 'our-source'; <ListItem avatar={{${imageSource}, someProp: someValue}}/>`,
      errors: [
        {
          message: `The shape of 'avatar' prop of 'ListItem' doesn't contain 'imageSource' anymore. Please use 'source' instead (fix is available).`
        }
      ],
      output: `import {ListItem} from 'our-source'; <ListItem avatar={{${source}, someProp: someValue}}/>`
    },
    {
      options: ruleOptions,
      code: `import {ListItem} from 'our-source'; <ListItem avatar={{someProp: someValue, ${imageSource}}}/>`,
      errors: [
        {
          message: `The shape of 'avatar' prop of 'ListItem' doesn't contain 'imageSource' anymore. Please use 'source' instead (fix is available).`
        }
      ],
      output: `import {ListItem} from 'our-source'; <ListItem avatar={{someProp: someValue, ${source}}}/>`
    },
    {
      options: ruleOptions,
      code: `import {ListItem} from 'our-source'; <ListItem someProp={someValue} avatar={{${imageSource}}}/>`,
      errors: [
        {
          message: `The shape of 'avatar' prop of 'ListItem' doesn't contain 'imageSource' anymore. Please use 'source' instead (fix is available).`
        }
      ],
      output: `import {ListItem} from 'our-source'; <ListItem someProp={someValue} avatar={{${source}}}/>`
    },
    {
      options: ruleOptions,
      code: PassedPropExampleCode,
      errors: [
        {
          message: `The shape of 'avatar' prop of 'Label' doesn't contain 'imageSource' anymore. Please use 'source' instead (fix is available).`
        }
      ],
      output: PassedPropExampleOutput
    },
    {
      options: ruleOptions,
      code: firstLevelSpreadCode,
      errors: [
        {
          message: `The shape of 'avatarProps' prop of 'Label' doesn't contain 'imageSource' anymore. Please use 'source' instead (fix is available).`
        }
      ],
      output: firstLevelSpreadOutput
    },
    {
      options: ruleOptions,
      code: secondLevelSpreadCode,
      errors: [
        {
          message: `The shape of 'avatar' prop of 'Label' doesn't contain 'imageSource' anymore. Please use 'source' instead (fix is available).`
        }
      ],
      output: secondLevelSpreadOutput
    },
    {
      options: ruleOptions,
      code: `import React, {Component} from 'react';
      import {Label, View} from 'our-source';
      class NewFeature extends Component {
        render () {
          return (
            <View>
              <Label title={'Best title ever'} avatar={{${imageSource}}}/>
            </View>
          )
        };
      }`,
      errors: [
        {
          message: `The shape of 'avatar' prop of 'Label' doesn't contain 'imageSource' anymore. Please use 'source' instead (fix is available).`
        }
      ],
      output: `import React, {Component} from 'react';
      import {Label, View} from 'our-source';
      class NewFeature extends Component {
        render () {
          return (
            <View>
              <Label title={'Best title ever'} avatar={{${source}}}/>
            </View>
          )
        };
      }`
    },
    {
      options: ruleOptions,
      code: bigExampleError,
      errors: [
        {
          message: `The shape of 'pannableHeaderProps' prop of 'Dialog' doesn't contain 'title' anymore. Please use 'header' instead (fix is available).`
        }
      ]
    },
    {
      options: ruleOptions,
      code: `
      import {Label} from 'our-source';
        const myProps1 = {
          avatarProps: {
            ${imageSource},
            goodProp1: goodValue1
          }
        };

        const myProps2 = {
          buttonProps: {
            goodProp2: goodValue2,
            goodProp3: goodValue3
          }
        };

      <Label goodProp={'goodValue'} {...myProps1} {...myProps2}/>`,
      errors: [
        {
          message: `The shape of 'avatarProps' prop of 'Label' doesn't contain 'imageSource' anymore. Please use 'source' instead (fix is available).`
        }
      ]
    },
    {
      options: ruleOptions,
      code: `
      import {Label} from 'our-source';
        const myProps1 = {
          buttonProps: {
            goodProp1: goodValue1,
            goodProp2: goodValue2,
          }
        };

        const myProps2 = {
          avatarProps: {
            goodProp3: goodValue3,
            ${imageSource}
          }
        };

      <Label goodProp={'goodValue'} {...myProps1} {...myProps2}/>`,
      errors: [
        {
          message: `The shape of 'avatarProps' prop of 'Label' doesn't contain 'imageSource' anymore. Please use 'source' instead (fix is available).`
        }
      ]
    },
    {
      options: ruleOptions,
      code: `import React, {Component} from 'react';
      import {Dialog, View} from 'our-source';
      class NewFeature extends Component {
        render () {
          return (
            <Dialog>
              <Dialog.Header title={'Best title ever'} avatar={{${imageSource}}}/>
            </Dialog>
          )
        };
      }`,
      errors: [
        {
          message: `The shape of 'avatar' prop of 'Dialog.Header' doesn't contain 'imageSource' anymore. Please use 'source' instead (fix is available).`
        }
      ],
      output: `import React, {Component} from 'react';
      import {Dialog, View} from 'our-source';
      class NewFeature extends Component {
        render () {
          return (
            <Dialog>
              <Dialog.Header title={'Best title ever'} avatar={{${source}}}/>
            </Dialog>
          )
        };
      }`
    },
    {
      options: ruleOptions,
      code: `import React, {Component} from 'react';
        import {MediaItem} from 'our-source';
        class NewFeature extends Component {
          render () {
            return (
              <MediaItem title={'Best title ever'} label={{avatarProps: {${imageSource}}}}/>
            )
          };
        }`,
      errors: [
        {
          message: `The shape of 'label.avatarProps' prop of 'MediaItem' doesn't contain 'imageSource' anymore. Please use 'source' instead (fix is available).`
        }
      ],
      output: `import React, {Component} from 'react';
        import {MediaItem} from 'our-source';
        class NewFeature extends Component {
          render () {
            return (
              <MediaItem title={'Best title ever'} label={{avatarProps: {${source}}}}/>
            )
          };
        }`
    },
    {
      options: ruleOptions,
      code: `import React, {Component} from 'react';
        import {ChipList} from 'our-source';
        class NewFeature extends Component {
          render () {
            return (
              <ChipList title={'Best title ever'} chips={[{label: {avatarProps: {${imageSource}}}}]}/>
            )
          };
        }`,
      errors: [
        {
          message: `The shape of 'chips.label.avatarProps' prop of 'ChipList' doesn't contain 'imageSource' anymore. Please use 'source' instead (fix is available).`
        }
      ],
      output: `import React, {Component} from 'react';
        import {ChipList} from 'our-source';
        class NewFeature extends Component {
          render () {
            return (
              <ChipList title={'Best title ever'} chips={[{label: {avatarProps: {${source}}}}]}/>
            )
          };
        }`
    },
    {
      options: ruleOptions,
      code: `import React, {Component} from 'react';
        import {MediaItem} from 'our-source';
        class NewFeature extends Component {
          render () {
            const labelProps = {
              avatarProps: {${imageSource}}
            };
            return (
              <MediaItem title={'Best title ever'} label={labelProps}/>
            )
          };
        }`,
      errors: [
        {
          message: `The shape of 'label.avatarProps' prop of 'MediaItem' doesn't contain 'imageSource' anymore. Please use 'source' instead (fix is available).`
        }
      ],
      output: `import React, {Component} from 'react';
        import {MediaItem} from 'our-source';
        class NewFeature extends Component {
          render () {
            const labelProps = {
              avatarProps: {${source}}
            };
            return (
              <MediaItem title={'Best title ever'} label={labelProps}/>
            )
          };
        }`
    },
    {
      options: ruleOptions,
      code: `import React, {Component} from 'react';
        import {MediaItem} from 'our-source';
        const labelProps = {
          avatarProps: {${imageSource}}
        };
        class NewFeature extends Component {
          render () {
            return (
              <MediaItem title={'Best title ever'} label={labelProps}/>
            )
          };
        }`,
      errors: [
        {
          message: `The shape of 'label.avatarProps' prop of 'MediaItem' doesn't contain 'imageSource' anymore. Please use 'source' instead (fix is available).`
        }
      ],
      output: `import React, {Component} from 'react';
        import {MediaItem} from 'our-source';
        const labelProps = {
          avatarProps: {${source}}
        };
        class NewFeature extends Component {
          render () {
            return (
              <MediaItem title={'Best title ever'} label={labelProps}/>
            )
          };
        }`
    },
    {
      options: ruleOptions,
      code: `import React, {Component} from 'react';
        import {MediaItem} from 'our-source';
        const labelProps = {
          avatarProps: {${imageSource}}
        };
        class NewFeature extends Component {
          render () {
            return (
              <MediaItem title={'Best title ever'} label={{...labelProps, anotherProp: val}}/>
            )
          };
        }`,
      errors: [
        {
          message: `The shape of 'label.avatarProps' prop of 'MediaItem' doesn't contain 'imageSource' anymore. Please use 'source' instead (fix is available).`
        }
      ],
      output: `import React, {Component} from 'react';
        import {MediaItem} from 'our-source';
        const labelProps = {
          avatarProps: {${source}}
        };
        class NewFeature extends Component {
          render () {
            return (
              <MediaItem title={'Best title ever'} label={{...labelProps, anotherProp: val}}/>
            )
          };
        }`
    },
    {
      options: ruleOptions,
      code: `import React, {Component} from 'react';
        import {MediaItem} from 'our-source';
        const imageProp = {
          propA: 'valueA',
          ${imageSource}
        };
        class NewFeature extends Component {
          render () {
            return (
              <MediaItem title={'Best title ever'} label={{avatar: imageProp}}/>
            )
          };
        }`,
      errors: [
        {
          message: `The shape of 'label.avatar' prop of 'MediaItem' doesn't contain 'imageSource' anymore. Please use 'source' instead (fix is available).`
        }
      ],
      output: `import React, {Component} from 'react';
        import {MediaItem} from 'our-source';
        const imageProp = {
          propA: 'valueA',
          ${source}
        };
        class NewFeature extends Component {
          render () {
            return (
              <MediaItem title={'Best title ever'} label={{avatar: imageProp}}/>
            )
          };
        }`
    },
    {
      options: ruleOptions,
      code: deprecationWithoutFix,
      errors: [
        {
          message: `The shape of 'thumbnail' prop of 'ListItem' doesn't contain 'useCustomTheme' anymore.`
        }
      ],
      output: deprecationWithoutFix
    }
  ]
});
