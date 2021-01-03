import {useEffect, useRef} from 'react';
import _ from 'lodash';

/**
 * This hook avoid calling useEffect on the initial value of his dependency array
 */
const useDidUpdate = (callback: () => void, dep: [any]) => {
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (!isMounted.current) {
      return;
    }
    callback();
  }, [dep]);

  useEffect(() => {
    isMounted.current = true;
  }, []);
};

export default useDidUpdate;
