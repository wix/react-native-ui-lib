---
index: 1
path: "/getting-started/setup"
title: "Setup"
---

## Install uilib

First, run `npm install react-native-ui-lib`

And then, install **peer dependencies**

```
npm i react-native-gesture-handler react-native-reanimated @react-native-community/blur @react-native-community/datetimepicker @react-native-community/netinfo

cd ios && pod install
```

## Install Native Dependencies (must)

Some of the components are using these native dependencies, they are defined as peer dependencies so you can install the version that suit you.

- "react-native-gesture-handler": ">=1.5.0",
- "react-native-reanimated": ">=1.4.0",
- "@react-native-community/blur": ">=3.4.1",
- ~~"react-native-interactable": ">=2.0.0"~~ (No Need in >=V5.0.0)
- "@react-native-community/datetimepicker": "^2.1.0"
- @react-native-community/netinfo": "^5.6.2

## Demo App

Our demo app is located [here](https://github.com/wix/react-native-ui-lib/tree/master/demo).

To run it:

- install dependencies: `npm install`
- (for iOS) `cd ios && pod install`
- start the packager: `npm start`
- run: `react-native run-ios` or `react-native run-android` (or within Xcode or Android Studio)
