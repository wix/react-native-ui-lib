import {NativeModules, AccessibilityInfo} from 'react-native';

NativeModules.StatusBarManager = {getHeight: jest.fn()};
jest.spyOn(AccessibilityInfo, 'isScreenReaderEnabled').mockImplementation(() => new Promise.resolve(false));

// mock native modules
jest.mock('@react-native-community/blur', () => {});
jest.mock('@react-native-community/netinfo', () => {});
jest.mock('react-native-reanimated', () => ({}));
jest.mock('react-native-gesture-handler', () => {});
jest.mock('@react-native-picker/picker', () => ({Picker: {Item: {}}}));
