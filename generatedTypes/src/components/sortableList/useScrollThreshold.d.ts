/// <reference types="react" />
/// <reference types="react-native-reanimated" />
import { LayoutChangeEvent } from 'react-native';
interface ScrollThreshold {
    top: number;
    bottom: number;
}
declare const useScrollThreshold: () => {
    measureRef: import("react").MutableRefObject<import("react-native").View | undefined>;
    onLayout: (event: LayoutChangeEvent) => void;
    setItemHeight: import("react").Dispatch<import("react").SetStateAction<number>>;
    scrollThreshold: import("react-native-reanimated").SharedValue<ScrollThreshold | undefined>;
    onContentSizeChange: (_width: number, height: number) => void;
    contentHeight: import("react-native-reanimated").SharedValue<number | undefined>;
    maxScroll: import("react-native-reanimated").SharedValue<number>;
    absMeasurements: import("../../hooks/useMeasure").AbsoluteMeasurements | undefined;
};
export default useScrollThreshold;
