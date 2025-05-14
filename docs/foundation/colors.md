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

Design Tokens provide semantic meaning to our color system by mapping contextual usage to system colors.
Each token follows the naming pattern: `$[property][Semantic][Weight]`

For example:
- `$backgroundPrimaryHeavy`: A heavy primary background color
- `$textSuccess`: Success-themed text color
- `$iconWarning`: Warning-themed icon color

### Design Token Structure

Design tokens follow a structured naming convention: `$[property][Semantic][Weight]`, where:

#### Property
Defines the UI element the token applies to:
- `background` - Background colors
- `text` - Text colors
- `icon` - Icon colors 
- `outline` - Border/outline colors

#### Semantic
Represents the contextual meaning:
- `neutral` - Neutral/default state
- `primary` - App's primary brand color
- `general` - General purpose
- `success` - Positive/success states
- `warning` - Warning/caution states
- `danger` - Error/danger states
- `disabled` - Disabled state
- `inverted` - Reversed/contrasting colors
- `default` - Default state

#### Weight (Optional)
Indicates the color intensity:
- `light` - Lighter variation
- `medium` - Medium intensity
- `heavy` - Heavier/darker variation

Examples:
- `$backgroundPrimaryHeavy` - Dark variant of primary background
- `$textSuccess` - Success state text color
- `$iconWarning` - Warning state icon color

View all available design tokens in our [token definition files](https://github.com/wix/react-native-ui-lib/blob/master/src/style/designTokens.ts).  

<ColorsTable />  


### Dark Mode Integration

Design tokens provide seamless dark mode support through automatic color mapping. Each token maps to appropriate system colors for both light and dark themes:

```javascript
// Example mapping
$textSuccess → green10 (light mode)
$textSuccess → green60 (dark mode)
```

View the complete token mappings:
- [Light mode tokens](https://github.com/wix/react-native-ui-lib/blob/master/src/style/designTokens.ts)
- [Dark mode tokens](https://github.com/wix/react-native-ui-lib/blob/master/src/style/designTokensDM.ts)

### Custom Design Tokens

Customize the design system by:

1. Using `loadSchemes()` to override existing tokens
2. Generating tokens from your primary brand color:

```javascript
Colors.loadSchemes({
  light: {
    $textDefault: '#20303C'
  },
  dark: {
    $textDefault: '#F8F8F8'
  }
});
```

This defines the default text color token for both light and dark modes.


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
