import {useEffect, useRef, DependencyList} from 'react';

/**
 * This hook avoid calling useEffect on the initial value of his dependency array
 */
const useDidUpdate = (callback: () => void, dep: DependencyList) => {
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (isMounted.current) {
      callback();
    } else {
      isMounted.current = true;
    }
  }, dep);
};

export default useDidUpdate;
