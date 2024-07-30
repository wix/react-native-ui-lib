import {NativeModules, AccessibilityInfo, Animated} from 'react-native';
// ========= Mock Object.defineProperty to always allow overriding =========
const originalDefineProperty = Object.defineProperty;
Object.defineProperty = (obj, prop, desc) => {
  try {
    return originalDefineProperty(obj, prop, {...desc, configurable: true});
  } catch (e) {
    return originalDefineProperty(obj, prop, desc);
  }
};
Object.defineProperties = (obj, props) => {
  Object.keys(props).forEach(key => {
    Object.defineProperty(obj, key, props[key]);
  });
  return obj;
};
// =========================================================================

global._UILIB_TESTING = true;

NativeModules.StatusBarManager = {getHeight: jest.fn()};
jest.spyOn(AccessibilityInfo, 'isScreenReaderEnabled').mockImplementation(() => Promise.resolve(false));

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
    GestureHandler.Gesture.Tap = () => {
      const TapMock = {
        _handlers: {}
      };

      const getDefaultMockedHandler = handlerName => handler => {
        if (typeof handler === 'function') {
          TapMock._handlers[handlerName] = handler;
        }
        return TapMock;
      };

      TapMock.type = 'tap';
      TapMock.maxDuration = getDefaultMockedHandler('maxDuration');
      TapMock.onEnd = getDefaultMockedHandler('onEnd');
      TapMock.onFinalize = getDefaultMockedHandler('onFinalize');
      TapMock.onTouchesDown = getDefaultMockedHandler('onTouchesDown');
      return TapMock;
    };

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

      PanMock.type = 'pan';
      PanMock.onStart = getDefaultMockedHandler('onStart');
      PanMock.onBegin = getDefaultMockedHandler('onBegin');
      PanMock.onUpdate = getDefaultMockedHandler('onUpdate');
      PanMock.onEnd = getDefaultMockedHandler('onEnd');
      PanMock.onFinalize = getDefaultMockedHandler('onFinalize');
      PanMock.activateAfterLongPress = getDefaultMockedHandler('activateAfterLongPress');
      PanMock.enabled = getDefaultMockedHandler('enabled');
      PanMock.onTouchesMove = getDefaultMockedHandler('onTouchesMove');
      PanMock.prepare = jest.fn();
      PanMock.initialize = jest.fn();
      PanMock.toGestureArray = jest.fn(() => {
        return [PanMock];
      });
      return PanMock;
    };

    try {
      Object.defineProperty(GestureHandler, 'GestureDetector', {
        value: require('./GestureDetectorMock').GestureDetectorMock
      });
    } catch {}
    return GestureHandler;
  },
  {virtual: true});
jest.mock('react-native', () => {
  const reactNative = jest.requireActual('react-native');
  reactNative.NativeModules.KeyboardTrackingViewTempManager = {};
  const OriginalModal = reactNative.Modal;
  const React = jest.requireActual('react');
  const useDidUpdate = require('./useDidUpdate').default;
  Object.defineProperty(reactNative, 'Modal', {
    value: props => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useDidUpdate(() => {
        if (!props.visible) {
          props.onDismiss?.();
        }
      }, [props.visible]);
      return <OriginalModal {...props}/>;
    }
  });
  return reactNative;
});

jest.mock('react-native-fs',
  () => {
    return {
      exists: jest.fn(() => true),
      readFile: jest.fn(),
      downloadFile: jest.fn(),
      mkdir: jest.fn()
    };
  },
  {virtual: true});

Animated.timing = (value, config) => ({
  start: callback => {
    value.setValue(config.toValue);
    callback?.();
  }
});
Animated.parallel = () => ({
  start: () => {}
});
Animated.event = () => {};

if (typeof String.prototype.replaceAll === 'undefined') {
  // eslint-disable-next-line no-extend-native
  String.prototype.replaceAll = function (match, replace) {
    return this.split(match).join(replace);
  };
}
