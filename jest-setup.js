import {NativeModules} from 'react-native';

NativeModules.StatusBarManager = {getHeight: jest.fn()};

// mock native modules
jest.mock('@react-native-community/blur', () => {});
