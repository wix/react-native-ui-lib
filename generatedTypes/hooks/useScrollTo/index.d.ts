import { RefObject } from 'react';
import { ScrollView, FlatList } from 'react-native';
export declare type ScrollToSupportedViews = ScrollView | FlatList;
export declare type ScrollToProps<T extends ScrollToSupportedViews> = {
    /**
     * A reference to the ScrollView (or FlatList) which the items are in
     */
    scrollViewRef?: RefObject<T>;
    /**
     * Is the scroll view horizontal (default is true)
     */
    horizontal?: boolean;
};
export declare type ScrollToResultProps<T extends ScrollToSupportedViews> = {
    /**
     * A reference to the ScrollView (or FlatList) which the items are in (from the props or a created one)
     */
    scrollViewRef: RefObject<T>;
    /**
     * scrollTo callback.
     * scrollToOffset - the x or y to scroll to.
     * animated - should the scroll be animated (default is true)
     */
    scrollTo: (scrollToOffset: number, animated?: boolean) => void;
};
declare const useScrollTo: <T extends ScrollToSupportedViews>(props: ScrollToProps<T>) => ScrollToResultProps<T>;
export default useScrollTo;
