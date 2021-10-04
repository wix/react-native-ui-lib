---
index: 2
path: "/getting-started/usage"
title: "Usage"
---
This is a quick example of how to use our basic components, modifiers and presets to generate a good looking screen. <br>
For detailed information please go over the other sections: Style, Modifiers, Components...

<!--
COPY-EDITOR NOTE 

The renders of the phone screen image I get in both Chrome and in the VSCode Markdown preview show the phone image overlaying the code part and the text above it - please check the layout of the image in the rendered docs.
-->

<img style="float: right; margin-top: -70px" src="https://cloud.githubusercontent.com/assets/1780255/24791489/f5db80f4-1b82-11e7-8538-5a3388fb4345.png" width=300 />

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
