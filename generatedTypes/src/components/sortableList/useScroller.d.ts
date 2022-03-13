/// <reference types="react" />
import { SharedValue } from 'react-native-reanimated';
interface Props {
    ref?: any;
    scroll: SharedValue<number>;
    isScrolling: SharedValue<boolean>;
    scrollRate: SharedValue<number>;
    maxScroll: SharedValue<number>;
    draggedItemRef?: any;
    absMeasurements?: any;
}
declare const useScroller: (props: Props) => {
    scrollRef: import("react").MutableRefObject<any>;
    onScrollStart: () => void;
    onScrollEnd: () => void;
    cleanScrollValues: () => void;
};
export default useScroller;
