import {useEffect, useRef, useCallback} from 'react';
import _ from 'lodash';

/**
 * This hook avoid calling useEffect on the initial value of his dependency array
 */
const useDidUpdate = (action: () => void, dep: [any]) => {
  const _dep = useRef<[any] | undefined>(dep);

  const isDataChanged = useCallback(() => {
    return !_.isEqual(_dep.current, dep);
  }, [dep]);

  useEffect(() => {
    if (!isDataChanged()) {
      return;
    }
    _dep.current = dep;

    action();
  }, [dep]);
};

export default useDidUpdate;
