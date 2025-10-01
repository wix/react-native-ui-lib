import { useCallback, useRef } from 'react';

/**
 * This hook is used to debounce a function call
 */
function useDebounce(func, timeout = 300) {
  const handler = useRef();
  const debouncedFunction = useCallback(args => {
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