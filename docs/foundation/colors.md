---
sidebar_position: 2
sidebar_label: Colors
title: "Colors"
---

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

```js
Colors.loadSchemes({
  light: {
    screenBG: 'transparent',
    textColor: Colors.grey10,
    moonOrSun: Colors.yellow30,
    mountainForeground: Colors.green30,
    mountainBackground: Colors.green50
  },
  dark: {
    screenBG: Colors.grey10,
    textColor: Colors.white,
    moonOrSun: Colors.grey80,
    mountainForeground: Colors.violet10,
    mountainBackground: Colors.violet20
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
