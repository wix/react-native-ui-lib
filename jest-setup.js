import {NativeModules, AccessibilityInfo} from 'react-native';

NativeModules.StatusBarManager = {getHeight: jest.fn()};
jest.spyOn(AccessibilityInfo, 'isScreenReaderEnabled').mockImplementation(() => new Promise.resolve(false));

// mock native modules
jest.mock('@react-native-community/blur', () => {});
jest.mock('@react-native-community/netinfo', () => {});
// TODO: Adding here a todo for package.json: need to remove moduleNameMapper, see this: https://github.com/software-mansion/react-native-reanimated/issues/1196
jest.mock('react-native-reanimated', () => {
  const reactNativeReanimated = require('react-native-reanimated/mock');
  reactNativeReanimated.interpolateColor = jest.fn(v => v); // TODO: See this https://github.com/software-mansion/react-native-reanimated/issues/2749
  return reactNativeReanimated;
});
global.__reanimatedWorkletInit = jest.fn();
jest.mock('react-native-gesture-handler', () => {});
jest.mock('@react-native-picker/picker', () => ({Picker: {Item: {}}}));
jest.mock('react-native', () => {
  const reactNative = jest.requireActual('react-native');
  reactNative.NativeModules.KeyboardTrackingViewTempManager = {};
  return reactNative;
});
