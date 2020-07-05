import React from 'react';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
export declare type ScrollReachedProps = {
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
     * Allows to b notified prior to actually reaching the start \ end of the scroll (by the threshold).
     * Should be a positive value.
     */
    threshold?: number;
};
export declare type WithScrollReachedProps = {
    scrollReachedProps: ScrollReachedProps;
    ref?: any;
};
declare function withScrollReached<PROPS>(WrappedComponent: React.ComponentType<PROPS & WithScrollReachedProps>, options?: WithScrollReachedOptionsProps): React.ComponentType<PROPS>;
export default withScrollReached;
