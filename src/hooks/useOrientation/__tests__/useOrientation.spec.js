import {renderHook, act} from '@testing-library/react-hooks';

let Constants;
let useOrientation;
let orientationChangeListeners;

describe('useOrientation hook', () => {
  beforeEach(() => {
    jest.mock('../../../commons/Constants');
    Constants = require('../../../commons/Constants').default;
    useOrientation = require('../index').default;

    orientationChangeListeners = [];

    Constants.addDimensionsEventListener = jest.fn(callback => {
      orientationChangeListeners.push(callback);
    });
  });

  it('should return current orientation', () => {
    act(() => {
      fakeOrientationChange('landscape');
    });
    const {result} = renderHook(() => {
      const {orientation} = useOrientation();

      return {orientation};
    });

    expect(result.current.orientation).toBe('landscape');
  });

  it('should update orientation when it change', () => {
    act(() => {
      fakeOrientationChange('landscape');
    });
    const {result} = renderHook(() => {
      const {orientation} = useOrientation();

      return {orientation};
    });

    act(() => {
      fakeOrientationChange('portrait');
    });

    expect(result.current.orientation).toBe('portrait');
  });

  it('should invoke given change callback when orientation changes', () => {
    const changeCallback = jest.fn();
    renderHook(() => {
      const {orientation} = useOrientation({onOrientationChange: changeCallback});
      return {orientation};
    });

    act(() => {
      fakeOrientationChange('landscape');
    });

    expect(changeCallback).toHaveBeenCalledTimes(1);
  });
});

function fakeOrientationChange(orientation = 'portrait') {
  Constants.orientation = orientation;
  orientationChangeListeners.forEach(callback => {
    callback(orientation);
  });
}
