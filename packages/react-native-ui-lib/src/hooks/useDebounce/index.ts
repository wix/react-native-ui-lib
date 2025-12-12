import {useCallback, useRef} from 'react';

/**
 * This hook is used to debounce a function call
 */
function useDebounce<A>(func: (args: A) => void, timeout = 300) {
  const handler = useRef<NodeJS.Timeout>();
  const debouncedFunction = useCallback((args: A) => {
    if (handler.current) {
      clearTimeout(handler.current);
    }
    handler.current = setTimeout(() => {
      func(args);
    }, timeout);
  }, [func, timeout]);

  return debouncedFunction;
}

export default useDebounce;
