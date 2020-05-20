---
index: 4
path: "/foundation/style"
title: "Style"
---
The base foundation of each UI component is its style.
We use basic style presets to define the rules and the style guide we follow.

Our presets includes: **Colors**, **Typography**, **Shadows**, **Border Radius** and more..

The UILib already comes with a set of predefined constants and [presets](../tree/master/src/style).

You can easily use it anywhere in your code as you would have used any other constant value, or as a component modifier.

It's also very easy to define your own presets..

```jsx
import {Typography, Colors} from 'react-native-ui-lib';

Colors.loadColors({
  pink: '#FF69B4',
  gold: '#FFD700',
});

Typography.loadTypographies({
  h1: {fontSize: 58, fontWeight: '300', lineHeight: 80},
  h2: {fontSize: 46, fontWeight: '300', lineHeight: 64},
});
```

and so for example, the following line

```jsx
<Text h1 pink>Hello World</Text>
```
Will generate this text
<img src="https://cloud.githubusercontent.com/assets/1780255/24792314/296b7ebc-1b86-11e7-8580-9252d1ddf5d9.png" width="250"/>

It will use the _h1_ preset for typography and the _pink_ color value we set to style the Text element. 