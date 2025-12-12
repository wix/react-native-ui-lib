const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/component-deprecation');
const deprecationsJson = require('../../component_deprecation.json');

RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  parserOptions: {ecmaVersion: 6, ecmaFeatures: {jsx: true}}
});

const ruleTester = new RuleTester();

const ruleOptions = [{deprecations: deprecationsJson}];
const invalidExample =
  "import {Avatar} from 'module-with-deprecations'; const test = <Avatar url={'some_uri_string'}/>";

// NOTE: Deprecated components will error at import and again if used as jsx tag.
// KNOWN BUG: usages such as module.List.Item will not be fixed (not supported ATM)
ruleTester.run('component-deprecation', rule, {
  valid: [
    {
      options: ruleOptions,
      code: `
    const Avatar = require('another-module').Avatar;
    const test = <Avatar source={{uri: 'some_uri_string'}}/>;
    `
    },
    {
      options: ruleOptions,
      code: `
    const {Avatar, List} = require('another-module');
    const test = <Avatar source={{uri: 'some_uri_string'}}/>;
    `
    },
    {
      options: ruleOptions,
      code: `
    const module = require('another-module');
    const {Avatar, TextField} = module;
    const test1 = <Avatar source={{uri: 'some_uri_string'}}/>;
    const test2 = <TextField>Bla</TextField>;
    `
    },
    {
      options: ruleOptions,
      code: `
    import {Avatar, TextField} from 'another-module';
    const test1 = <Avatar url={'some_uri_string'}/>;
    const test2 = <TextField>Bla</TextField>;
    `
    },
    {
      options: ruleOptions,
      code: `
    import {List} from 'module-with-deprecations';
    <List/>`
    },
    {
      options: ruleOptions,
      code: `
      import {MyComponent} from 'module-with-deprecations';
      const {ScrollView} = MyComponent;
      <ScrollView/>;
      `
    },
    {
      options: ruleOptions,
      code: `
      import {MyComponent} from 'module-with-deprecations';
      const {ScrollView: S, FlatList: F} = MyComponent;
      <S/>;
      `
    },
    {
      options: ruleOptions,
      code: `
      import {MyComponent} from 'module-with-deprecations';
      <MyComponent.ScrollView/>;
      `
    },
    {
      options: ruleOptions,
      code: `
      import {ScrollView} from 'another-module';
      <ScrollView/>;
      `
    },
    {
      options: ruleOptions,
      code: `
      import {ScrollView} from 'another-module';
      import {View} from 'module-with-deprecations';
      <ScrollView/>;
      `
    },
    {
      options: ruleOptions,
      code: `
      import {ScrollView as S} from 'another-module';
      import {View} from 'module-with-deprecations';
      <S/>;
      `
    },
    {
      options: ruleOptions,
      code: `
      import {ScrollView} from 'another-module';
      import {View as V} from 'module-with-deprecations';
      <ScrollView/>;
      `
    }
  ],
  invalid: [
    {
      options: ruleOptions,
      code: invalidExample,
      errors: [
        {message: "The 'Avatar' component is deprecated. Please use the 'Picture' component instead."},
        {message: "The 'Avatar' component is deprecated. Please use the 'Picture' component instead."}
      ]
    },
    {
      options: [{...ruleOptions[0], dueDate: '10/11/18'}],
      code: invalidExample,
      errors: [
        {
          message:
            "The 'Avatar' component is deprecated. Please use the 'Picture' component instead. Please fix this issue by 10/11/18!"
        },
        {
          message:
            "The 'Avatar' component is deprecated. Please use the 'Picture' component instead. Please fix this issue by 10/11/18!"
        }
      ]
    },
    {
      options: ruleOptions,
      code: 'import {Button} from \'module-with-deprecations\'; <Button text="my button"/>',
      output: 'import {Touch} from \'module-with-deprecations\'; <Touch text="my button"/>',
      errors: [
        {message: "The 'Button' component is deprecated. Please use the 'Touch' component instead."},
        {message: "The 'Button' component is deprecated. Please use the 'Touch' component instead."}
      ]
    },
    {
      options: ruleOptions,
      code: 'import {TextInput} from \'module-with-deprecations\'; <TextInput placeholder="first name"/>',
      output: 'import {TextField} from \'module-with-deprecations\'; <TextField placeholder="first name"/>',
      errors: [
        {message: "The 'TextInput' component is deprecated. Please use the 'TextField' component instead."},
        {message: "The 'TextInput' component is deprecated. Please use the 'TextField' component instead."}
      ]
    },
    {
      options: ruleOptions,
      code: `import {List} from 'module-with-deprecations'; <List.Part/>`,
      output: `import {List} from 'module-with-deprecations'; <List.Item/>`,
      errors: [
        {
          message:
            "The 'List.Part' component is deprecated. Please use the 'List.Item' component instead (fix is working partially)."
        }
      ]
    },
    {
      options: ruleOptions,
      code: `import {Button} from 'module-with-deprecations';
        const props = {text: "button", color: "red"};
        <Button {...props} value="value"/>`,
      output: `import {Touch} from 'module-with-deprecations';
        const props = {text: "button", color: "red"};
        <Touch {...props} value="value"/>`,
      errors: [
        {message: "The 'Button' component is deprecated. Please use the 'Touch' component instead."},
        {message: "The 'Button' component is deprecated. Please use the 'Touch' component instead."}
      ]
    },
    {
      options: ruleOptions,
      code: `import {Button as B} from 'module-with-deprecations';
        const props = {text: "button", color: "red"};
        <B {...props} value="value"/>`,
      output: `import {Touch as B} from 'module-with-deprecations';
        const props = {text: "button", color: "red"};
        <B {...props} value="value"/>`,
      errors: [{message: "The 'Button' component is deprecated. Please use the 'Touch' component instead."}]
    },
    {
      options: ruleOptions,
      code: `import * as module from 'module-with-deprecations';
            const {Button} = module;
            const props = {text: "button", color: "red"};
            <Button {...props} value="value"/>`,
      output: `import * as module from 'module-with-deprecations';
            const {Touch} = module;
            const props = {text: "button", color: "red"};
            <Touch {...props} value="value"/>`,
      errors: [
        {message: "The 'Button' component is deprecated. Please use the 'Touch' component instead."},
        {message: "The 'Button' component is deprecated. Please use the 'Touch' component instead."}
      ]
    },
    {
      options: ruleOptions,
      code: `import * as module from 'module-with-deprecations';
            const {Button: B} = module;
            const props = {text: "button", color: "red"};
            <B {...props} value="value"/>`,
      output: `import * as module from 'module-with-deprecations';
            const {Touch: B} = module;
            const props = {text: "button", color: "red"};
            <B {...props} value="value"/>`,
      errors: [{message: "The 'Button' component is deprecated. Please use the 'Touch' component instead."}]
    },
    {
      options: ruleOptions,
      code: `import * as module from 'module-with-deprecations';
            const props = {text: "button", color: "red"};
            <module.Button {...props} value="value"/>`,
      output: `import * as module from 'module-with-deprecations';
            const props = {text: "button", color: "red"};
            <module.Touch {...props} value="value"/>`,
      errors: [{message: "The 'Button' component is deprecated. Please use the 'Touch' component instead."}]
    },
    {
      options: ruleOptions,
      code: `import * as module from 'module-with-deprecations';
            <module.List.Part/>`,
      // TODO: Fix is not working on this example
      output: `import * as module from 'module-with-deprecations';
            <module.List.Part/>`,
      errors: [
        {
          message:
            "The 'List.Part' component is deprecated. Please use the 'List.Item' component instead (fix is working partially)."
        }
      ]
    },
    {
      options: ruleOptions,
      code: `import {List} from 'another-module-with-deprecations'; <List/>;`,
      output: `import {ListList} from 'another-module-with-deprecations'; <ListList/>;`,
      errors: [
        {message: "The 'List' component is deprecated. Please use the 'ListList' component instead."},
        {message: "The 'List' component is deprecated. Please use the 'ListList' component instead."}
      ]
    },
    {
      options: ruleOptions,
      code: `import {View, Button, TextInput} from 'module-with-deprecations';
            <View>
              <Button text="my button"/>
              <TextInput placeholder="first name"/>
            </View>`,
      output: `import {View, Touch, TextField} from 'module-with-deprecations';
            <View>
              <Touch text="my button"/>
              <TextField placeholder="first name"/>
            </View>`,
      errors: [
        {message: "The 'Button' component is deprecated. Please use the 'Touch' component instead."},
        {message: "The 'TextInput' component is deprecated. Please use the 'TextField' component instead."},
        {message: "The 'Button' component is deprecated. Please use the 'Touch' component instead."},
        {message: "The 'TextInput' component is deprecated. Please use the 'TextField' component instead."}
      ]
    },
    {
      options: ruleOptions,
      code: `const module = require('module-with-deprecations');
        const {Button, List, TextField} = module;
        const props = {text: "button", color: "red"};
        const test1 = <Button {...props} value="value"/>;
        const test2 = <TextField>Bla</TextField>;`,
      output: `const module = require('module-with-deprecations');
        const {Touch, List, TextField} = module;
        const props = {text: "button", color: "red"};
        const test1 = <Touch {...props} value="value"/>;
        const test2 = <TextField>Bla</TextField>;`,
      errors: [
        {message: "The 'Button' component is deprecated. Please use the 'Touch' component instead."},
        {message: "The 'Button' component is deprecated. Please use the 'Touch' component instead."}
      ]
    },
    {
      options: ruleOptions,
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
      output: `const {Picture, Touch, Thumbnail, View} = require('module-with-deprecations');
        const {ListList, Card} = require('another-module-with-deprecations');
        const props = {text: "button", color: "red"};
        <View>
          <Touch {...props} value="value"/>
          <Picture url={{url: 'some_uri_string'}}/>
          <Thumbnail url={'some_uri_string'}/>
          <Card/>
          <ListList text="my list"/>
        </View>`,
      errors: [
        {message: "The 'Avatar' component is deprecated. Please use the 'Picture' component instead."},
        {message: "The 'Button' component is deprecated. Please use the 'Touch' component instead."},
        {message: "The 'List' component is deprecated. Please use the 'ListList' component instead."},
        {message: "The 'Button' component is deprecated. Please use the 'Touch' component instead."},
        {message: "The 'Avatar' component is deprecated. Please use the 'Picture' component instead."},
        {message: "The 'List' component is deprecated. Please use the 'ListList' component instead."}
      ]
    },
    {
      options: ruleOptions,
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
      output: `const {Picture: A, Touch: B, Thumbnail: T, View} = require('module-with-deprecations');
        const {ListList: L, Card: C} = require('another-module-with-deprecations');
        const props = {text: "button", color: "red"};
        <View>
          <B {...props} value="value"/>
          <A url={{url: 'some_uri_string'}}/>
          <T url={'some_uri_string'}/>
          <C/>
          <L text="my list"/>
        </View>`,
      errors: [
        {message: "The 'Avatar' component is deprecated. Please use the 'Picture' component instead."},
        {message: "The 'Button' component is deprecated. Please use the 'Touch' component instead."},
        {message: "The 'List' component is deprecated. Please use the 'ListList' component instead."}
      ]
    },
    {
      options: ruleOptions,
      code: `import {ScrollView} from 'module-with-deprecations'; <ScrollView/>;`,
      output: `import {ScrollView} from 'module-with-deprecations'; <ScrollView/>;`,
      errors: [
        {message: "The 'ScrollView' component is deprecated. Please use the 'MyComponent.ScrollView' component instead."},
        {message: "The 'ScrollView' component is deprecated. Please use the 'MyComponent.ScrollView' component instead."}
      ]
    },
    {
      options: ruleOptions,
      code: `import {ScrollView as S} from 'module-with-deprecations'; <S/>;`,
      errors: [
        {message: "The 'ScrollView' component is deprecated. Please use the 'MyComponent.ScrollView' component instead."},
      ]
    }
  ]
});
