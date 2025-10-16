---
sidebar_position: 1
sidebar_label: Setup
title: "Setup"
# path: "/getting-started/setup"
---
### Installation

1. Install the library
```bash
npm install react-native-ui-lib
```

2. Install mandatory peer dependencies
```bash
npm install react-native-reanimated react-native-gesture-handler uilib-native
```

3. For iOS, install pods
```bash
cd ios && pod install
```

> **Note:** If you plan to use specific components, check the [Optional Dependencies](#optional-dependencies) section. Some components may require additional peer dependencies.

4. Follow [Reanimated setup guide](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started) to complete the installation.


### Required Dependencies

UILib requires the following peer dependencies for core functionality:
- `react-native-reanimated` - Follow the [Reanimated setup guide](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started)
- `react-native-gesture-handler`

These packages are essential for animations and gesture handling capabilities.
### Optional Dependencies

UILib supports additional features through optional dependencies. These packages are required only when using specific components:

| Package | Required For |
|---------|-------------|
| @react-native-community/blur | Card component's blur effects |
| @react-native-community/datetimepicker | Date/time picker components |
| @react-native-community/netinfo | Network connectivity features |
| react-native-haptic-feedback | Haptic feedback functionality |
| react-native-svg | SVG-based components |
| react-native-shimmer-placeholder | Shimmer loading effects |
| react-native-linear-gradient | Gradient-based components |
| moment | Date manipulation utilities |

Install only the dependencies you need based on the components you plan to use in your application.


### Native Dependencies

UILib uses several native dependencies to support its functionality. Some of these are mandatory, while others are required only for specific components.

#### Core Dependencies 
These packages are required for basic functionality:
```bash
"react-native-gesture-handler": ">=2.24.0"
"react-native-reanimated": ">=3.17.5"
```

#### Component-Specific Dependencies
Install these based on the components you plan to use:
```bash
"@react-native-community/blur": ">=4.4.1"
"@react-native-community/datetimepicker": "^8.2.0"
"@react-native-community/netinfo": "^5.6.2" # Required for ConnectionStatusBar
```

> **Important:** After installing native dependencies, run `cd ios && pod install` to complete the iOS setup.


## Demo App

To explore the UILib demo app:

1. Clone the repository
```bash
git clone git@github.com:wix/react-native-ui-lib.git
cd react-native-ui-lib
```

2. Install dependencies
```bash
yarn
```

3. Platform-specific setup:

For iOS:
```bash
cd ios && pod install
```

For Windows:
- Replace `export DEV_MODE` with `set DEV_MODE` in scripts
- Copy `gradlew.bat` from a recent React Native project to `./android/`
- Install Watchman:
  - Use prebuilt binary from [official site](https://facebook.github.io/watchman/docs/install#prebuilt-binaries)
  - Or via Chocolatey: `choco install watchman`

4. Run the app
```bash
# Start Metro bundler
yarn start

# Launch on iOS/Android
yarn ios
# or
yarn android
```

You can also open the project directly in Xcode or Android Studio.

## Starter Kits
Thanks to [Batyr](https://github.com/kanzitelli) we have these amazing starter kits 

- [RNUILib + ReactNativeNavigation Starter Kit](https://github.com/kanzitelli/rnn-starter)
- [RNUILib + ReactNavigation Starter Kit](https://github.com/kanzitelli/rn-starter)
- [RNUILib + Expo Starter Kit](https://github.com/kanzitelli/expo-starter)
