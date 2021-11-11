import {useEffect, useCallback, useState, useRef} from 'react';
import {Constants} from 'helpers';
import useDidUpdate from '../useDidUpdate';

interface UseOrientationProps {
  onOrientationChange?: Function;
}

const useOrientation = ({onOrientationChange}: UseOrientationProps = {}) => {
  const [orientation, setOrientation] = useState(Constants.orientation);
  const listener = useRef<any>();

  const orientationChangeListener = useCallback(() => {
    setOrientation(Constants.orientation);
  }, []);

  useEffect(() => {
    listener.current = Constants.addDimensionsEventListener(orientationChangeListener);
    return () => Constants.removeDimensionsEventListener(listener.current);
  }, []);

  useDidUpdate(() => {
    onOrientationChange?.(orientation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orientation]);

  return {
    orientation
  };
};

export default useOrientation;
