/// <reference types="react" />
declare const useListScroll: () => {
    scrollRef: import("react").MutableRefObject<any>;
    onScroll: (event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void;
    cleanScrollValues: () => void;
    onDrag: (translation: number, ref: any) => void;
    measureRef: import("react").MutableRefObject<import("react-native").View | undefined>;
    onLayout: (event: import("react-native").LayoutChangeEvent) => void;
    setItemHeight: import("react").Dispatch<import("react").SetStateAction<number>>;
    onContentSizeChange: (_width: number, height: number) => void;
};
export default useListScroll;
