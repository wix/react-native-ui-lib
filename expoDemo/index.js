import { AppRegistry } from 'react-native';

// import App from './App';
// import { name as appName } from './app.json';

// AppRegistry.registerComponent(appName, () => App);

// import {registerScreens} from 'unicorn-demo-app';

// registerScreens(AppRegistry.registerComponent);

import 'expo/build/Expo.fx';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import {activateKeepAwake} from 'expo-keep-awake';

import App from './App';

if (__DEV__) {
  activateKeepAwake();
}

registerRootComponent(App);
