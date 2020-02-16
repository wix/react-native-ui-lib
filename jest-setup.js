import {NativeModules, AccessibilityInfo} from 'react-native';

NativeModules.StatusBarManager = {getHeight: jest.fn()};
jest.spyOn(AccessibilityInfo, 'fetch').mockImplementation(() => new Promise.resolve(false));

// mock native modules
jest.mock('@react-native-community/blur', () => {});
