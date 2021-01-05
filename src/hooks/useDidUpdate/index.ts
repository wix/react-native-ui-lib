import {useEffect, useRef} from 'react';

/**
 * This hook avoid calling useEffect on the initial value of his dependency array
 */
const useDidUpdate = (callback: () => void, dep: [any]) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      callback();
    } else {
      didMountRef.current = true;
    }
  }, dep);
};

export default useDidUpdate;
