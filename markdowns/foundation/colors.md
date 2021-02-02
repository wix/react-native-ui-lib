---
index: 7
path: "/foundation/colors"
title: "Colors"
---

#### rgba
usage:
```jsx
import {Colors} from 'react-native-ui-lib';

Colors.rgba('#ff2442', 0.05); // 'rgb(255, 36, 66, 0.05)'
Colors.rgba(44, 224, 112, 0.2); // 'rgb(44, 224, 112, 0.2)'
```

#### getColorTint
usage:
```jsx
import {Colors} from 'react-native-ui-lib';

Colors.getColorTint(Colors.green30, 70); // will return the value of Colors.green70
Colors.getColorTint('#ff2442, 50); // will return the 5th tint in an autogenerate 8 tints palette based on #ff2442
```

#### isDark
returns if a color is considered dark (bright colors will return false)
```js
import {Colors} from 'react-native-ui-lib';

Colors.isDark(Colors.grey10); // true
Colors.isDark(Colors.grey80); // false
```
