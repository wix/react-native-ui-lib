import React from 'react';
import { FlatListProps, ScrollViewProps, LayoutChangeEvent } from 'react-native';
export declare type ScrollEnablerProps = {
    onContentSizeChange: (contentWidth: number, contentHeight: number) => void;
    onLayout: (event: LayoutChangeEvent) => void;
    scrollEnabled: boolean;
};
declare type SupportedViews = FlatListProps<any> | ScrollViewProps;
export declare type WithScrollEnablerProps = SupportedViews & {
    scrollEnablerProps: ScrollEnablerProps;
    ref?: any;
};
declare function withScrollEnabler<PROPS extends SupportedViews>(WrappedComponent: React.ComponentType<WithScrollEnablerProps>): React.ComponentType<PROPS>;
export default withScrollEnabler;
