# react-native-ui-lib (WIP - Stay Tuned) [![Build Status](https://travis-ci.org/wix/react-native-ui-lib.svg?branch=master)](https://travis-ci.org/wix/react-native-ui-lib)
UI Components Library for React Native


# Getting Started
## Installation
`yarn add react-native-ui-lib`


or


`npm i --save react-native-ui-lib`

## Native Dependencies
Some of the components are using these native dependencies, they are not a requirement but will allow you to create
better lookings apps (:

* react-native-animatable
* react-native-blur


## Usage

<img style="float: right; margin-top: -70px" src="https://cloud.githubusercontent.com/assets/1780255/24791489/f5db80f4-1b82-11e7-8538-5a3388fb4345.png" width=300 /> 

```javascript 
import React, {Component} from 'react';
import {View, TextInput, Text, Button} from 'react-native-ui-lib';

export default class Example extends Component {

  render() {
    return (
      <View flex paddingH-25 paddingT-120>
        <Text blue50 text20>Welcome</Text>
        <TextInput text50 placeholder="username" dark10/>
        <TextInput text50 placeholder="password" secureTextEntry dark10/>
        <View marginT-100 center>
          <Button text70 white background-orange30 label="Login"/>
          <Button link text70 orange30 label="Sign Up" marginT-20/>
        </View>
      </View>
    );
  }
}
```

<br>

# Style
The base foundation of each UI component is its style. <br>
We use basic style presets to define the rules and the style guide we follow. <br>
Our presetes includes: **Colors**, **Typography**, **Shadows**, **Border Radiuses** and more..

The UILib already comes with a set of predefined constants and [presets](./src/style). <br>
You can easily use it anywhere in your code as you would have used any other constant value, or as a component modifier. <br>

It's also very easy to define your own presets..

```
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


and so for example, the following line <br>
```
<Text h1 pink>Hello World</Text>
```
Will generate this text <br>
<img src="https://cloud.githubusercontent.com/assets/1780255/24792314/296b7ebc-1b86-11e7-8580-9252d1ddf5d9.png" width="250"/> 

<br>

# Modifiers
As you probably noticed already, we translate our style presets into modifiers. <br>
**Modifiers** will help you create a stunning UI easily and quickly.

### Align Faster
Use our alignment props to quickly position your content without getting confused calculating all these flex rules. <br>
**left**, **top**, **right**, **bottom**, **row**, **center**, **centerH (Horizontal Center)**, **centerV (Vertical Center)**

```
<View left>
  <Button label="Button">
</View>

<View right>
  <Button label="Button">
</View>

<View top>
  <Button label="Button">
</View>

<View bottom>
  <Button label="Button">
</View>

<View center>
  <Button label="Button">
</View>
```
<img src="https://cloud.githubusercontent.com/assets/1780255/24798566/4de91efc-1b9f-11e7-9974-e06e3daa7c63.png" width="160"/> <img src="https://cloud.githubusercontent.com/assets/1780255/24798569/50dc99a4-1b9f-11e7-8231-fbcbb139a010.png" width="160"/> <img src="https://cloud.githubusercontent.com/assets/1780255/24798571/52766d08-1b9f-11e7-95a3-b2b262e81170.png" width="160"/> <img src="https://cloud.githubusercontent.com/assets/1780255/24798572/545b7abe-1b9f-11e7-9098-409ceee6ff22.png" width="160"/> <img src="https://cloud.githubusercontent.com/assets/1780255/24798575/55e3c4f4-1b9f-11e7-998d-7986a038abb6.png" width="160"/> 

### Spacing & Styling
Same goes here... space, stretch and color in a more readable way. <br>

- **[colorKey]**(text color), **background-[colorKey]** <br>

- **[typographyPresetKey]** (text components)

- **flex**, **flex-[value]**

- **padding-[value]**, **paddingL-[value]**, **paddingT-[value]**, **paddingR-[value]**, **paddingB-[value]**, **paddingH-[value]**, **paddingV-[value]**

- **margin-[value]**, **marginL-[value]**, **marginT-[value]**, **marginR-[value]**, **marginB-[value]**, **marginH-[value]**, **marginV-[value]**

Check out [this example](https://github.com/wix/react-native-ui-lib#usage) where we use most of these props

## Components (WIP)
- Avatar
- Badge
- Basic List
- Button
- Card
- Connection Status Bar
- List Item
- Grid List
- State Screen
- Loader Screen
- Page Control
- Picker
- Stepper
- Text
- TextInput

## Helpers

### AvatarHelpers
#### getInitials
usage: </br>
```
import {AvatarHelper} from 'react-native-ui-lib';

AvatarHelper.getInitials('Lilly Wheeler'); // LW
AvatarHelper.getInitials('Russell Lloyd'); // RL
AvatarHelper.getInitials('Andrew'); // A
```

### Colors
#### rgba
usage: </br>
```
import {Colors} from 'react-native-ui-lib';

Colors.rgba('#ff2442', 0.05); // 'rgb(255, 36, 66, 0.05)'
Colors.rgba(44, 224, 112, 0.2); // 'rgb(44, 224, 112, 0.2)'
```
