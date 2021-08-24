import { LayoutChangeEvent } from 'react-native';
import { ScrollToProps, ScrollToSupportedViews, ScrollToResultProps } from '../useScrollTo';
export declare enum OffsetType {
    CENTER = "CENTER",
    DYNAMIC = "DYNAMIC",
    LEFT = "LEFT",
    RIGHT = "RIGHT"
}
export declare type ScrollToItemProps<T extends ScrollToSupportedViews> = Pick<ScrollToProps<T>, 'scrollViewRef'> & {
    /**
     * The number of items
     */
    itemsCount: number;
    /**
     * The selected item's index
     */
    selectedIndex?: number;
    /**
     * Where would the item be located (default to CENTER)
     */
    offsetType?: OffsetType;
    /**
     * Add a margin to the offset (default to true)
     * This gives a better UX
     * Not relevant to OffsetType.CENTER
     */
    addOffsetMargin?: boolean;
    /**
     * How much space (padding \ margin) is there on the left\right of the items
     */
    outerSpacing?: number;
    /**
     * How much space (padding \ margin) is there between each item
     */
    innerSpacing?: number;
};
export declare type ScrollToItemResultProps<T extends ScrollToSupportedViews> = Pick<ScrollToResultProps<T>, 'scrollViewRef'> & {
    /**
     * This should be called by each ot the items' onLayout
     */
    onItemLayout: (event: LayoutChangeEvent, index: number) => void;
    /**
     * The items' width
     */
    itemsWidths: number[];
    /**
     * Use in order to focus the item with the specified index (use when the selectedIndex is not changed)
     */
    focusIndex: (index: number, animated?: boolean) => void;
    /**
     * onContentSizeChange callback (should be set to your onContentSizeChange).
     * Needed for RTL support on Android.
     */
    onContentSizeChange: (contentWidth: number, contentHeight: number) => void;
    /**
     * onLayout callback (should be set to your onLayout).
     * Needed for RTL support on Android.
     */
    onLayout: (event: LayoutChangeEvent) => void;
};
declare const useScrollToItem: {
    <T extends ScrollToSupportedViews>(props: ScrollToItemProps<T>): ScrollToItemResultProps<T>;
    offsetType: typeof OffsetType;
};
export default useScrollToItem;
