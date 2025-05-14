---
sidebar_position: 1
sidebar_label: Setup
title: "Setup"
# path: "/getting-started/setup"
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

- Run `npm install react-native-ui-lib`  
- Install mandatory [peer dependencies](#peer-dependencies), `npm i react-native-reanimated react-native-gesture-handler`
- Install ios pods, `cd ios && pod install`

If you plan on using specific components, see **UILib Packages** above.  
*For some packages you might still need to install one of the peer dependencies*


### Peer Dependencies
UILIb has mandatory peer dependencies on the following packages:
- react-native-reanimated (Make sure to follow [Reanimated setup guide](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started))
- react-native-gesture-handler

### Optional Dependencies
Some dependencies are optional and required by specific components or features (e.g. Card's blur features requires installing `@react-native-community/blur` package)

The following are optional dependencies:
- @react-native-community/blur
- @react-native-community/datetimepicker
- @react-native-community/netinfo


## Install Native Dependencies
If you plan on using specific components, see **UILib Packages**.  
*For some packages you might still need to install one of the native dependencies*

Some of the components are using the native dependencies listed below - those are defined as peer dependencies, so you can install the version that suits you.  

> It's important to run `cd ios && pod install` if you are using a component that has a native dependency.

- "react-native-gesture-handler": ">=2.22.0" (mandatory)
- "react-native-reanimated": ">=3.16.7" (mandatory)
- "@react-native-community/blur": ">=3.4.1" (required for Card component when passing `enableBlur` prop)
- "@react-native-community/datetimepicker": "^2.1.0"
- "@react-native-community/netinfo": "^5.6.2" (required for ConnectionStatusBar component)

## Demo App

- Clone the project `git clone git@github.com:wix/react-native-ui-lib.git`
- `cd react-native-ui-lib`
- Install dependencies `npm install`
- (for iOS) `cd ios && pod install`
- (for Windows)
  - update `...&& export DEV_MODE...` with `...&& set DEV_MODE...`
  - copy `gradlew.bat` from a recent project to `./android/`
  - install fb-watchman for [windows](https://facebook.github.io/watchman/docs/install#prebuilt-binaries) or `choco install watchman`  
- Start the packager `npm start`
- Build the app `npm run ios` or `npm run android` (or from Xcode or Android Studio).

## Starter Kits
Thanks to [Batyr](https://github.com/kanzitelli) we have these amazing starter kits 

- [RNUILib + ReactNativeNavigation Starter Kit](https://github.com/kanzitelli/rnn-starter)
- [RNUILib + ReactNavigation Starter Kit](https://github.com/kanzitelli/rn-starter)
- [RNUILib + Expo Starter Kit](https://github.com/kanzitelli/expo-starter)
