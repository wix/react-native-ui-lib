import {renderHook, act} from '@testing-library/react-hooks';
import {AccessibilityInfo} from 'react-native';
import {Constants} from '../../../commons/new';
import useHiddenLocation from '../useHiddenLocation';

describe('useHiddenLocation', () => {
  const defaultExpectedLocation = {
    up: -Constants.windowHeight,
    down: Constants.windowHeight,
    left: -Constants.screenWidth,
    right: Constants.screenWidth,
    wasMeasured: true
  };

  beforeEach(() => {
    jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false);
    (AccessibilityInfo.addEventListener as jest.Mock) = jest.fn().mockImplementation((_event, _callback) => {
      return {
        remove: jest.fn()
      };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return default positions when no layout is provided', () => {
    const {result} = renderHook(() => useHiddenLocation());
    expect(result.current.hiddenLocation).toEqual(defaultExpectedLocation);
  });

  it('should return defaultHiddenLocation on Android when reduce motion is enabled', () => {
    const originalIsAndroid = Constants.isAndroid;
    Constants.isAndroid = true;

    const {result} = renderHook(() => useHiddenLocation());
    act(() => {
      const callback = (AccessibilityInfo.addEventListener as jest.Mock).mock.calls[0][1];
      callback(true);
    });
    expect(result.current.hiddenLocation).toEqual(defaultExpectedLocation);
    Constants.isAndroid = originalIsAndroid;
  });
});
