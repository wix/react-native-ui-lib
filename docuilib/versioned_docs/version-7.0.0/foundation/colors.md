---
sidebar_position: 2
sidebar_label: Colors
title: 'Colors'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {ColorsTable, ColorsPalette} from '@site/src/components/ColorsSection'

Our default library Colors object is using **System Colors** and **Design Tokens**.

<Tabs>
<TabItem value="design_tokens" label="Design Tokens" default>
### Design Tokens

Design Tokens are contextual colors based on the system colors.  
The design token name structure is "$[property]-[semantic]-[weight]". (e.g $backgroundPrimaryHeavy, $textSuccessLight)

<ColorsTable />

- **Property** - The property we use this token for. The properties are:

  - `background`
  - `text`
  - `icon`
  - `outline`

- **Semantic** - the meaning of the color, what is the message that we want to pass using this color. The semantics are:

  - `neutral`
  - `primary` - the primary color of the app, means, blue for Spaces app and green for Fit app.
  - `general`
  - `success`
  - `warning`
  - `danger`
  - `disabled`
  - `inverted`
  - `default`

- **Weight** - the weight of the color (optional). The weights are:
  - `light`
  - `medium`
  - `heavy`

So, for example, a valid token can be: `$backgroundPrimaryHeavy` or `$textSuccess`.
A full list of our design tokens can be found here -

### Dark Mode Support

By using design tokens, your getting dark mode support out of the box!
Each token is mapped to a single system color in light mode and to a (usually different) single system color in dark mode.
For example, `$textSuccess` is mapped to `green10` in light (deafult) mode, and to `green60` in dark mode.
All the design tokens and their mapping in light mode can be found [here](https://github.com/wix/react-native-ui-lib/blob/master/src/style/designTokens.ts), dark mode mapping can be found [here](https://github.com/wix/react-native-ui-lib/blob/master/src/style/designTokensDM.ts).

### Add Your Own Design Tokens

Adding or overriding your own design tokens can be done by using the [loadSchemes](https://wix.github.io/react-native-ui-lib/docs/foundation/colors#loadschemes) method.
To generate the design tokens, based on your app primary color and load them automatically into the `Colors` object, use:

```javascript
Colors.loadDesignTokens({primaryColor: <your primary color>});
```

This method will update all the `primary` tokens to be based on your app primary color, both in light and dark mode.
</TabItem>
<TabItem value="system_colors" label="System Colors">

### System Colors

The System Colors are all the colors we use in our design system. (red30, grey10 and so on).

<ColorsPalette />

</TabItem>
<TabItem value="accessibility" label="Accessibility">
</TabItem>

<TabItem value="dev" label="Dev">

### loadColors

Load a set of colors to be used in the app.  
These colors will be accessible through the Colors class and as modifiers.
usage:

```javascript
import {Colors} from 'react-native-ui-lib';

Colors.loadColors({
  error: '#ff2442',
  success: '#00CD8B',
  text: '#20303C'
});
```

```jsx
import {View, Text, Colors} from 'react-native-ui-lib';

<View>
  <Text style={{color: Colors.error}}>Error Message</Text>
  <Text success>Success Message</Text>
<View>
```

### loadSchemes

Load a set of scheme colors to support dark/light mode.  
This feature works hand in hand with our modifiers
This method also supports adding and overriding design tokens:

```js
Colors.loadSchemes({
  light: {
    screenBG: 'transparent',
    textColor: Colors.grey10,
    moonOrSun: Colors.yellow30,
    mountainForeground: Colors.green30,
    mountainBackground: Colors.green50,
    $backgroundSuccess: Colors.green40,
    $backgroundSuccessLight: Colors.green70
  },
  dark: {
    screenBG: Colors.grey10,
    textColor: Colors.white,
    moonOrSun: Colors.grey80,
    mountainForeground: Colors.violet10,
    mountainBackground: Colors.violet20,
    $backgroundSuccess: Colors.green40,
    $backgroundSuccessLight: Colors.green20
  }
});
```

```jsx
<View flex padding-page bg-screenBG>
  <Text h1 textColor>
    Dark Mode
  </Text>
</View>
```

**Note:** for dark mode support please add the following `require` in your app, in an initial place, before importing `react-native-ui-lib` at the first time.

```
require('react-native-ui-lib/config').setConfig({appScheme: 'default'});
```

### rgba

usage:

```js
import {Colors} from 'react-native-ui-lib';

Colors.rgba('#ff2442', 0.05); // 'rgb(255, 36, 66, 0.05)'
Colors.rgba(44, 224, 112, 0.2); // 'rgb(44, 224, 112, 0.2)'
```

### getColorTint

usage:

```js
import {Colors} from 'react-native-ui-lib';

Colors.getColorTint(Colors.green30, 70); // will return the value of Colors.green70
Colors.getColorTint('#ff2442', 50); // will return the 5th tint in an autogenerate 8-tints palette based on '#ff2442'
```

### isDark

returns `true` if a color is considered dark (bright colors will return `false`)

```js
import {Colors} from 'react-native-ui-lib';

Colors.isDark(Colors.grey10); // true
Colors.isDark(Colors.grey80); // false
```

</TabItem>
</Tabs>
