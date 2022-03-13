/// <reference types="react" />
import { ScrollProps } from './types';
interface Props extends ScrollProps {
    swapItemsIfNeeded: () => void;
}
declare const useItemScroll: (props: Props) => {
    ref: import("react").MutableRefObject<any>;
};
export default useItemScroll;
