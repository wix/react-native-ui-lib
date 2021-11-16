---
sidebar_position: 2
sidebar_label: Usage
title: "Usage"
# path: "/getting-started/usage"
---
This is a quick example of how to use our basic components, modifiers and presets to generate a good looking screen.  
For detailed information please go over the other sections: [Style](../foundation/style.md), [Modifiers](../foundation/modifiers.md), Components...

![basic showcase](basic-showcase.png).

```jsx
import React, {Component} from 'react';
import {View, TextField, Text, Button} from 'react-native-ui-lib';

export default class Example extends Component {

  render() {
    return (
      <View flex paddingH-25 paddingT-120>
        <Text blue50 text20>Welcome</Text>
        <TextField text50 placeholder="username" grey10/>
        <TextField text50 placeholder="password" secureTextEntry grey10/>
        <View marginT-100 center>
          <Button text70 white background-orange30 label="Login"/>
          <Button link text70 orange30 label="Sign Up" marginT-20/>
        </View>
      </View>
    );
  }
}
```
