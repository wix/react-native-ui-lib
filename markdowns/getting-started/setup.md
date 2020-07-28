---
index: 1
path: "/getting-started/setup"
title: "Setup"
---

## UILib Packages
Before you start.  
Starting version 5.12.0 UILib exports individual packages so you can import only what you need.  

**Why packages are important?**
- Smaller bundle size. By importing only the components you need, your bundle size will be reduced to the files that were imported.
- Quicker setup. Avoid installing peer dependencies and linking native depdencies that you don't need. 

**How does it work?**
```
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';
import {KeyboardTrackingView, KeyboardAwareInsetsView, KeyboardRegistry, KeyboardAccessoryView, KeyboardUtils} from 'react-native-ui-lib/keyboard';
...
```


## Install UILib

First, run `npm install react-native-ui-lib`

### Peer Dependencies
:information_source: If you're planning on using speicific components, see **UILib Packages**.  
*For some packages you might still need to install one of the peer dependencies*

If you want it all, install **peer dependencies**
```
npm i react-native-gesture-handler react-native-reanimated @react-native-community/blur @react-native-community/datetimepicker @react-native-community/netinfo @react-native-community/picker

cd ios && pod install
```


## Install Native Dependencies (must)
:information_source: If you're planning on using speicific components, see **UILib Packages**.  
*For some packages you might still need to install one of the native dependencies*

Some of the components are using these native dependencies, they are defined as peer dependencies so you can install the version that suit you.  
It's important to run `cd ios && pod install` if you are using a component that has native dependency 

- "react-native-gesture-handler": ">=1.5.0",
- "react-native-reanimated": ">=1.4.0",
- "@react-native-community/blur": ">=3.4.1",
- ~~"react-native-interactable": ">=2.0.0"~~ (No Need in >=V5.0.0)
- "@react-native-community/datetimepicker": "^2.1.0"
- "@react-native-community/netinfo": "^5.6.2"
- "@react-native-community/picker": "^1.6.5"

## Demo App

Our demo app is located [here](https://github.com/wix/react-native-ui-lib/tree/master/demo).

To run it:

- install dependencies: `npm install`
- (for iOS) `cd ios && pod install && cd ..`
- start the packager: `npm start`
- run: `npm run ios` or `npm run android` (or within Xcode or Android Studio)
