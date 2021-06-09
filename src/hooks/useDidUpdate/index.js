import React, { useEffect, useRef } from 'react';
/**
 * This hook avoid calling useEffect on the initial value of his dependency array
 */

const useDidUpdate = (callback, dep) => {
  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      callback();
    } else {
      isMounted.current = true;
    }
  }, dep);
};

export default useDidUpdate;