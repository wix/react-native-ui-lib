---
index: 1
sidebar_position: 1
path: "/getting-started/setup"
title: "Setup"
---

## Before You Start: UILib Packages

Starting with version 5.12.0 UILib exports individual packages so you can import only what you need.  

### Why packages are important?
- Smaller bundle size. By importing only the components you need, your bundle size will be reduced to the files that were imported.
- Quicker setup. Avoid installing peer dependencies and linking native dependencies you don't need. 

### How does it work?
```javascript
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';
import {KeyboardTrackingView, KeyboardAwareInsetsView, KeyboardRegistry, KeyboardAccessoryView, KeyboardUtils} from 'react-native-ui-lib/keyboard';
...
```


## Install UILib

First, run `npm install react-native-ui-lib`

### Peer Dependencies
If you plan on using specific components, see **UILib Packages** above.
*For some packages you might still need to install one of the peer dependencies*

If you want it all, install **peer dependencies**:
```js
npm i react-native-gesture-handler react-native-reanimated @react-native-community/blur @react-native-community/datetimepicker @react-native-community/netinfo @react-native-picker/picker

cd ios && pod install
```


## Install Native Dependencies
If you plan on using specific components, see **UILib Packages**.  
*For some packages you might still need to install one of the native dependencies*

Some of the components are using the native dependencies listed below - those are defined as peer dependencies, so you can install the version that suits you.  

> It's important to run `cd ios && pod install` if you are using a component that has a native dependency.

- "react-native-gesture-handler": ">=1.9.0" (mandatory)
- "react-native-reanimated": ">=1.13.2" (mandatory)
- "@react-native-community/blur": ">=3.4.1" (required for Card component when passing `enableBlur` prop)
- "@react-native-community/datetimepicker": "^2.1.0"
- "@react-native-community/netinfo": "^5.6.2" (required for ConnectionStatusBar component)
- "@react-native-picker/picker": "^1.9.4" (required for Picker component when passing `useNativePicker` prop)

## Demo App

Our demo app is located [here](https://github.com/wix/react-native-ui-lib/tree/master/demo). To run it:

- Clone the repo
- Install dependencies: `npm install`
- (for iOS) `cd ios && pod install && cd ..`
- Start the packager: `npm start`
- Build the app: `npm run ios` or `npm run android` (or from Xcode or Android Studio).
