import React from 'react';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
export declare type ScrollReachedProps = {
    onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    isScrollAtStart?: boolean;
    isScrollAtEnd?: boolean;
};
export declare type WithScrollReachedProps = {
    scrollReachedProps: ScrollReachedProps;
    ref?: any;
};
declare function withScrollReached<PROPS>(WrappedComponent: React.ComponentType<PROPS & WithScrollReachedProps>): React.ComponentType<PROPS>;
export default withScrollReached;
