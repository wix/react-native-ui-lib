import React from 'react';
import { FlatListProps, ScrollViewProps, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
export declare type ScrollReachedProps = {
    onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    isScrollAtStart?: boolean;
    isScrollAtEnd?: boolean;
};
declare type SupportedViews = FlatListProps<any> | ScrollViewProps;
export declare type WithScrollReachedProps = SupportedViews & {
    scrollReachedProps: ScrollReachedProps;
    ref?: any;
};
declare function withScrollReached<PROPS extends SupportedViews>(WrappedComponent: React.ComponentType<WithScrollReachedProps>): React.ComponentType<PROPS>;
export default withScrollReached;
