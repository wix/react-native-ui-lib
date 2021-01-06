import { RefObject } from 'react';
import { LayoutChangeEvent, ScrollView, FlatList } from 'react-native';
export declare enum OffsetType {
    CENTER = "CENTER",
    DYNAMIC = "DYNAMIC",
    LEFT = "LEFT",
    RIGHT = "RIGHT"
}
export declare type Props = {
    /**
     * A reference to the ScrollView (or FlatList) which the items are in
     */
    scrollViewRef: RefObject<ScrollView | FlatList>;
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
     * How much space (padding \ margin) is there on he left\right of the items
     */
    outerSpacing?: number;
    /**
     * How much space (padding \ margin) is there between each item
     */
    innerSpacing?: number;
};
export declare type ResultProps = {
    /**
     * This should be called by each ot the items' onLayout
     */
    onItemLayout: (event: LayoutChangeEvent, index: number) => void;
    /**
     * The items' width
     */
    itemsWidths: number[];
    /**
     * Use in order to focus the item with the specified index
     */
    focusIndex: (index: number, animated?: boolean) => void;
};
declare const useFocusItemsHelper: (props: Props) => ResultProps;
export default useFocusItemsHelper;
