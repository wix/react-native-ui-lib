import React from 'react';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
declare type ScrollReachedProps = {
    onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    /**
     * Is the scroll at the start (or equal\smaller than the threshold if one was given)
     */
    isScrollAtStart?: boolean;
    /**
     * Is the scroll at the end (or equal\greater than the threshold if one was given)
     */
    isScrollAtEnd?: boolean;
};
export declare type WithScrollReachedOptionsProps = {
    /**
     * Whether the scroll is horizontal.
     */
    horizontal?: boolean;
    /**
     * Allows to be notified prior to actually reaching the start \ end of the scroll (by the threshold).
     * Should be a positive value.
     */
    threshold?: number;
};
export declare type WithScrollReachedProps = {
    scrollReachedProps: ScrollReachedProps;
    ref?: any;
};
/**
 * @description: Add scroll reached which notifies on reaching start \ end of ScrollView \ FlatList
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/WithScrollReachedScreen.tsx
 * @notes: Send `props.scrollReachedProps.onScroll` to your onScroll and receive via props.scrollReachedProps.isScrollAtStart props.scrollReachedProps.isScrollAtEnd
 */
declare function withScrollReached<PROPS, STATICS = {}>(WrappedComponent: React.ComponentType<PROPS & WithScrollReachedProps>, options?: WithScrollReachedOptionsProps): React.ComponentType<PROPS> & STATICS;
export default withScrollReached;
