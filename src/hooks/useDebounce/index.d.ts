/**
 * This hook is used to debounce a function call
 */
declare function useDebounce<A>(func: (args: A) => void, timeout?: number): (args: A) => void;
export default useDebounce;
