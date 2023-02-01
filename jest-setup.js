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
  reactNativeReanimated.FadeIn = {
    duration: jest.fn()
  };
  return reactNativeReanimated;
});
global.__reanimatedWorkletInit = jest.fn();
jest.mock('react-native-gesture-handler',
  () => {
    jest.requireActual('react-native-gesture-handler/jestSetup');
    const GestureHandler = jest.requireActual('react-native-gesture-handler');
    GestureHandler.Gesture.Pan = () => {
      const PanMock = {
        _handlers: {}
      };

      const getDefaultMockedHandler = handlerName => handler => {
        if (typeof handler === 'function') {
          PanMock._handlers[handlerName] = handler;
        }
        return PanMock;
      };

      PanMock.onStart = getDefaultMockedHandler('onStart');
      PanMock.onUpdate = getDefaultMockedHandler('onUpdate');
      PanMock.onEnd = getDefaultMockedHandler('onEnd');
      PanMock.prepare = jest.fn();
      return PanMock;
    };

    return GestureHandler;
  },
  {virtual: true});
jest.mock('@react-native-picker/picker', () => ({Picker: {Item: {}}}));
jest.mock('react-native', () => {
  const reactNative = jest.requireActual('react-native');
  reactNative.NativeModules.KeyboardTrackingViewTempManager = {};
  return reactNative;
});
jest.mock('./src/incubator/Dialog', () => {
  const Dialog = jest.requireActual('./src/incubator/Dialog');
  Dialog.default._inTest = true;
  return Dialog;
});

if (typeof String.prototype.replaceAll === 'undefined') {
  // eslint-disable-next-line no-extend-native
  String.prototype.replaceAll = function (match, replace) {
    return this.split(match).join(replace);
  };
}
