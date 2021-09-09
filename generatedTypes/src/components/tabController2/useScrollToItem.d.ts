import { RefObject } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { ScrollToSupportedViews, ScrollToResultProps } from 'hooks';
export declare enum OffsetType {
    CENTER = "CENTER",
    DYNAMIC = "DYNAMIC",
    LEFT = "LEFT",
    RIGHT = "RIGHT"
}
export declare type ScrollToItemProps<T extends ScrollToSupportedViews> = {
    scrollViewRef?: RefObject<T>;
    /**
     * The number of items
     */
    itemsCount: number;
    /**
     * The selected item's index
     */
    selectedIndex?: number;
    /**
     * The container width, should update on orientation change
     */
    containerWidth: number;
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
     * The items' width as share animated value
     */
    itemsWidthsAnimated: any;
    /**
     * The items' offsets as share animated value
     */
    itemsOffsetsAnimated: any;
    /**
     * Use in order to focus the item with the specified index (use when the selectedIndex is not changed)
     */
    focusIndex: (index: number, animated?: boolean) => void;
    /**
     * Use in order to reset the data.
     */
    reset: () => void;
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
