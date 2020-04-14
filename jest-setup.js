import {NativeModules, AccessibilityInfo} from 'react-native';

NativeModules.StatusBarManager = {getHeight: jest.fn()};
jest.spyOn(AccessibilityInfo, 'isScreenReaderEnabled').mockImplementation(() => new Promise.resolve(false));

// mock native modules
jest.mock('@react-native-community/blur', () => {});
jest.mock('@react-native-community/netinfo', () => {});
