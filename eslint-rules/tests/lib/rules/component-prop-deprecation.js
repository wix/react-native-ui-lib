const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/component-prop-deprecation');
const deprecationsJson = require('../../component_prop_deprecation.json');
const fs = require('fs');
const bigExample = fs.readFileSync('../demo/src/screens/componentScreens/AvatarsScreen.tsx', 'utf8');

RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  parserOptions: {ecmaVersion: 6, ecmaFeatures: {jsx: true}}
});

const ruleTester = new RuleTester();

const ruleOptions = [{deprecations: deprecationsJson}];
const invalidExample =
  "import {Avatar} from 'module-with-deprecations'; const test = <Avatar url={'some_uri_string'}/>";

ruleTester.run('component-prop-deprecation', rule, {
  valid: [
    {
      options: ruleOptions,
      code: `const Avatar = require('another-module').Avatar;
        const test = <Avatar source={{uri: 'some_uri_string'}}/>;`
    },
    {
      options: ruleOptions,
      code: `const {Avatar, List} = require('another-module');
        const test = <Avatar source={{uri: 'some_uri_string'}}/>;`
    },
    {
      options: ruleOptions,
      code: `const module = require('another-module');
        const {Avatar, TextField} = module;
        const test1 = <Avatar source={{uri: 'some_uri_string'}}/>;
        const test2 = <TextField>Bla</TextField>;`
    },
    {
      options: ruleOptions,
      code: `import {Avatar, TextField} from 'another-module';
        const test1 = <Avatar url={'some_uri_string'}/>;
        const test2 = <TextField>Bla</TextField>;`
    },
    {
      options: ruleOptions,
      code: `import {List} from 'module-with-deprecations';
        <List/>`
    },
    {
      options: ruleOptions,
      code: 'import {List} from \'module-with-deprecations\'; <List text="my list"/>'
    },
    {
      options: ruleOptions,
      code: bigExample
    },
    {
      options: ruleOptions,
      code: `
        const A = require('some-module').Avatar;
        const {Button, Card: C} = require('another-module');
        import {Dialog as D, Egg} from 'some-module';
        const module = require('another-module');
        const {Files: F, Guide} = module;
        const {Wizard: W} = Guide;
        const Dir = F.Dir;
        const Header = D.Header;
      `
    },
    {
      options: ruleOptions,
      code: `
      import {Button} from 'another-module';
      import {View} from 'module-with-deprecations';
      <Button text="my button"/>
      `
    },
    {
      options: ruleOptions,
      code: `
      import {Button} from 'another-module';
      import {View as V} from 'module-with-deprecations';
      <Button text="my button"/>
      `
    },
    {
      options: ruleOptions,
      code: `
      import {Picker} from 'module-with-deprecations';
      <Picker value="value" migrate={true}/>
      `
    },
  ],
  invalid: [
    {
      options: ruleOptions,
      code: invalidExample,
      errors: [{message: "The 'Avatar' component's prop 'url' is deprecated. Please use the 'source' prop instead."}]
    },
    {
      options: [{...ruleOptions[0], dueDate: '10/11/18'}],
      code: invalidExample,
      errors: [
        {
          message:
            "The 'Avatar' component's prop 'url' is deprecated. Please use the 'source' prop instead. Please fix this issue by 10/11/18!" // eslint-disable-line
        }
      ]
    },
    {
      options: [{...ruleOptions[0], dueDate: '10/11/18'}],
      code: `import {Thumbnail} from 'module-with-deprecations'; const test = <Thumbnail url={'some_uri_string'}/>`,
      output: `import {Thumbnail} from 'module-with-deprecations'; const test = <Thumbnail uri={'some_uri_string'}/>`,
      errors: [
        {
          message:
            "The 'Thumbnail' component's prop 'url' is deprecated. Please use the 'uri' prop instead. Please fix this issue by 10/11/18!" // eslint-disable-line
        }
      ]
    },
    {
      options: ruleOptions,
      code: 'import {Button} from \'module-with-deprecations\'; <Button text="my button"/>',
      output: 'import {Button} from \'module-with-deprecations\'; <Button label="my button"/>',
      errors: [{message: "The 'Button' component's prop 'text' is deprecated. Please use the 'label' prop instead."}]
    },
    {
      options: ruleOptions,
      code: 'import {List} from \'another-module-with-deprecations\'; <List text="my list"/>',
      output: 'import {List} from \'another-module-with-deprecations\'; <List label="my list"/>',
      errors: [{message: "The 'List' component's prop 'text' is deprecated. Please use the 'label' prop instead."}]
    },
    {
      options: ruleOptions,
      code: `import {Button} from 'module-with-deprecations';
        const props = {text: "button", color: "red"};
        <Button {...props} value="value"/>`,
      output: `import {Button} from 'module-with-deprecations';
        const props = {label: "button", color: "red"};
        <Button {...props} value="value"/>`,
      errors: [{message: "The 'Button' component's prop 'text' is deprecated. Please use the 'label' prop instead."}]
    },
    {
      options: ruleOptions,
      code: `import {Button as B} from 'module-with-deprecations';
        const props = {text: "button", color: "red"};
        <B {...props} value="value"/>`,
      output: `import {Button as B} from 'module-with-deprecations';
        const props = {label: "button", color: "red"};
        <B {...props} value="value"/>`,
      errors: [{message: "The 'Button' component's prop 'text' is deprecated. Please use the 'label' prop instead."}]
    },
    {
      options: ruleOptions,
      code: `import * as module from 'module-with-deprecations';
        const {Button} = module;
        const props = {text: "button", color: "red"};
        <Button {...props} value="value"/>`,
      output: `import * as module from 'module-with-deprecations';
        const {Button} = module;
        const props = {label: "button", color: "red"};
        <Button {...props} value="value"/>`,
      errors: [{message: "The 'Button' component's prop 'text' is deprecated. Please use the 'label' prop instead."}]
    },
    {
      options: ruleOptions,
      code: `import * as module from 'module-with-deprecations';
        const props = {text: "button", color: "red"};
        <module.Button {...props} value="value"/>`,
      output: `import * as module from 'module-with-deprecations';
        const props = {label: "button", color: "red"};
        <module.Button {...props} value="value"/>`,
      errors: [{message: "The 'Button' component's prop 'text' is deprecated. Please use the 'label' prop instead."}]
    },
    {
      options: ruleOptions,
      code: `const Button = require('module-with-deprecations').Button
        const props = {text: "button", color: "red"};
        <Button {...props} value="value"/>`,
      output: `const Button = require('module-with-deprecations').Button
        const props = {label: "button", color: "red"};
        <Button {...props} value="value"/>`,
      errors: [{message: "The 'Button' component's prop 'text' is deprecated. Please use the 'label' prop instead."}]
    },
    {
      options: ruleOptions,
      code: `const {Button, List} = require('module-with-deprecations')
        const props = {text: "button", color: "red"};
        const test = <Button {...props} value="value"/>;`,
      output: `const {Button, List} = require('module-with-deprecations')
        const props = {label: "button", color: "red"};
        const test = <Button {...props} value="value"/>;`,
      errors: [{message: "The 'Button' component's prop 'text' is deprecated. Please use the 'label' prop instead."}]
    },
    {
      options: ruleOptions,
      code: `const module = require('module-with-deprecations');
        const {Button, List, TextField} = module;
        const props = {text: "button", color: "red"};
        const test1 = <Button {...props} value="value"/>;
        const test2 = <TextField>Bla</TextField>;`,
      output: `const module = require('module-with-deprecations');
        const {Button, List, TextField} = module;
        const props = {label: "button", color: "red"};
        const test1 = <Button {...props} value="value"/>;
        const test2 = <TextField>Bla</TextField>;`,
      errors: [{message: "The 'Button' component's prop 'text' is deprecated. Please use the 'label' prop instead."}]
    },
    {
      options: [{...ruleOptions[0], dueDate: '10/11/18'}],
      code: `import {Avatar as A, Button as B, Thumbnail as T, View} from 'module-with-deprecations';
        import {List as L} from 'another-module-with-deprecations';
        const props = {text: "button", color: "red"};
        <View>
          <B {...props} value="value"/>
          <A url={{url: 'some_uri_string'}}/>
          <T url={'some_uri_string'}/>
          <L text="my list"/>
        </View>`,
      output: `import {Avatar as A, Button as B, Thumbnail as T, View} from 'module-with-deprecations';
        import {List as L} from 'another-module-with-deprecations';
        const props = {label: "button", color: "red"};
        <View>
          <B {...props} value="value"/>
          <A url={{url: 'some_uri_string'}}/>
          <T uri={'some_uri_string'}/>
          <L label="my list"/>
        </View>`,
      errors: [
        {
          message:
            "The 'Button' component's prop 'text' is deprecated. Please use the 'label' prop instead. Please fix this issue by 10/11/18!"
        },
        {
          message:
            "The 'Avatar' component's prop 'url' is deprecated. Please use the 'source' prop instead. Please fix this issue by 10/11/18!"
        },
        {
          message:
            "The 'Thumbnail' component's prop 'url' is deprecated. Please use the 'uri' prop instead. Please fix this issue by 10/11/18!"
        },
        {
          message:
            "The 'List' component's prop 'text' is deprecated. Please use the 'label' prop instead. Please fix this issue by 10/11/18!"
        }
      ]
    },
    {
      options: [{...ruleOptions[0], dueDate: '10/11/18'}],
      code: `const {Avatar, Button, Thumbnail, View} = require('module-with-deprecations');
        const {List, Card} = require('another-module-with-deprecations');
        const props = {text: "button", color: "red"};
        <View>
          <Button {...props} value="value"/>
          <Avatar url={{url: 'some_uri_string'}}/>
          <Thumbnail url={'some_uri_string'}/>
          <Card/>
          <List text="my list"/>
        </View>`,
      output: `const {Avatar, Button, Thumbnail, View} = require('module-with-deprecations');
        const {List, Card} = require('another-module-with-deprecations');
        const props = {label: "button", color: "red"};
        <View>
          <Button {...props} value="value"/>
          <Avatar url={{url: 'some_uri_string'}}/>
          <Thumbnail uri={'some_uri_string'}/>
          <Card/>
          <List label="my list"/>
        </View>`,
      errors: [
        {
          message:
            "The 'Button' component's prop 'text' is deprecated. Please use the 'label' prop instead. Please fix this issue by 10/11/18!"
        },
        {
          message:
            "The 'Avatar' component's prop 'url' is deprecated. Please use the 'source' prop instead. Please fix this issue by 10/11/18!"
        },
        {
          message:
            "The 'Thumbnail' component's prop 'url' is deprecated. Please use the 'uri' prop instead. Please fix this issue by 10/11/18!"
        },
        {
          message:
            "The 'List' component's prop 'text' is deprecated. Please use the 'label' prop instead. Please fix this issue by 10/11/18!"
        }
      ]
    },
    {
      options: [{...ruleOptions[0], dueDate: '10/11/18'}],
      code: `const {Avatar: A, Button: B, Thumbnail: T, View} = require('module-with-deprecations');
        const {List: L, Card: C} = require('another-module-with-deprecations');
        const props = {text: "button", color: "red"};
        <View>
          <B {...props} value="value"/>
          <A url={{url: 'some_uri_string'}}/>
          <T url={'some_uri_string'}/>
          <C/>
          <L text="my list"/>
        </View>`,
      output: `const {Avatar: A, Button: B, Thumbnail: T, View} = require('module-with-deprecations');
        const {List: L, Card: C} = require('another-module-with-deprecations');
        const props = {label: "button", color: "red"};
        <View>
          <B {...props} value="value"/>
          <A url={{url: 'some_uri_string'}}/>
          <T uri={'some_uri_string'}/>
          <C/>
          <L label="my list"/>
        </View>`,
      errors: [
        {
          message:
            "The 'Button' component's prop 'text' is deprecated. Please use the 'label' prop instead. Please fix this issue by 10/11/18!"
        },
        {
          message:
            "The 'Avatar' component's prop 'url' is deprecated. Please use the 'source' prop instead. Please fix this issue by 10/11/18!"
        },
        {
          message:
            "The 'Thumbnail' component's prop 'url' is deprecated. Please use the 'uri' prop instead. Please fix this issue by 10/11/18!"
        },
        {
          message:
            "The 'List' component's prop 'text' is deprecated. Please use the 'label' prop instead. Please fix this issue by 10/11/18!"
        }
      ]
    },
    {
      options: ruleOptions,
      code: `const {List} = require('module-with-deprecations')
        const props = {text: "list"};
        const test = <List.Item {...props} value="value"/>;`,
      output: `const {List} = require('module-with-deprecations')
        const props = {label: "list"};
        const test = <List.Item {...props} value="value"/>;`,
      errors: [{message: "The 'List.Item' component's prop 'text' is deprecated. Please use the 'label' prop instead."}]
    },
    {
      options: ruleOptions,
      code: `import * as module from 'module-with-deprecations';
        const props = {text: "list"};
        <module.List.Item {...props} value="value"/>`,
      output: `import * as module from 'module-with-deprecations';
        const props = {label: "list"};
        <module.List.Item {...props} value="value"/>`,
      errors: [{message: "The 'List.Item' component's prop 'text' is deprecated. Please use the 'label' prop instead."}]
    },
    {
      options: ruleOptions,
      code: 'import {Text} from \'module-with-deprecations\'; <Text t="title" s="subtitle"/>',
      output: 'import {Text} from \'module-with-deprecations\'; <Text title="title" subtitle="subtitle"/>',
      errors: [
        {message: "The 'Text' component's prop 't' is deprecated. Please use the 'title' prop instead."},
        {message: "The 'Text' component's prop 's' is deprecated. Please use the 'subtitle' prop instead."}
      ]
    },
    {
      options: ruleOptions,
      code: 'import {Picker} from \'module-with-deprecations\'; <Picker t="title" s="subtitle"/>',
      errors: [
        {message: "The 'Picker' component's prop 'migrate' is required. Please make sure to pass the 'migrate' prop."},
      ]
    }
  ]
});
