import React from 'react';
import { LayoutChangeEvent } from 'react-native';
export declare type ScrollEnablerProps = {
    onContentSizeChange: (contentWidth: number, contentHeight: number) => void;
    onLayout: (event: LayoutChangeEvent) => void;
    scrollEnabled: boolean;
};
export declare type WithScrollEnablerProps = {
    scrollEnablerProps: ScrollEnablerProps;
    ref?: any;
};
declare function withScrollEnabler<PROPS>(WrappedComponent: React.ComponentType<PROPS & WithScrollEnablerProps>): React.ComponentType<PROPS>;
export default withScrollEnabler;
