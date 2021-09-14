import { DependencyList } from 'react';
/**
 * This hook avoid calling useEffect on the initial value of his dependency array
 */
declare const useDidUpdate: (callback: () => void, dep: DependencyList) => void;
export default useDidUpdate;
