---
sidebar_position: 5
sidebar_label: ThemeManager
title: "ThemeManager"
---

Use `ThemeManager` to set default global behavior for your app.

#### setComponentTheme

Set default props for a component by passing an object or a callback (for dynamic, runtime default props)
The default value will be overridden if a prop is being passed to the component instance (see `setComponentForcedTheme` for that).

- `ThemeManager.setComponentTheme(componentName, defaultPropsObject);`
- `ThemeManager.setComponentTheme(componentName, componentProps => newDefaultPropsObject);`

Example

```js
import {ThemeManager} from 'react-native-ui-lib';

ThemeManager.setComponentTheme('Text', {
    text70: true, // will set the text70 typography modifier prop to be true by default
    grey10: true, // will set the grey10 color modifier prop to be true by default 
});


ThemeManager.setComponentTheme('Button', (props, context) => {

  return {
    // this will apply a different backgroundColor
    // depending on whether the Button has an outline or not
    backgroundColor: props.outline ? 'black' : 'green',
  };
});
```

#### setComponentForcedTheme
Same as `setComponentTheme`, but can't be overridden by props passed to the component. 

Example

```js
ThemeManager.setComponentForcedTheme('Card', (props, context) => {
  return {
    containerStyle: [styles.defaultContainerStyle, props.containerStyle]
  };
});
```