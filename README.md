# react-native-ui-lib (WIP - Stay Tuned) [![Build Status](https://travis-ci.org/wix/react-native-ui-lib.svg?branch=master)](https://travis-ci.org/wix/react-native-ui-lib)
UI Components Library for React Native 

## Components
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

### Dependecies 
- react-native-animatable
- react-native-blur (Picker)
