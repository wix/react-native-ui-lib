import React from 'react';
import { ViewProps, ScrollViewProps } from 'react-native';
import { ForwardRefInjectedProps } from '../../commons/forwardRef';
export declare type FadedScrollViewProps = ViewProps & ScrollViewProps & {
    children?: React.ReactNode | React.ReactNode[];
};
declare type Props = FadedScrollViewProps & ForwardRefInjectedProps;
declare const _default: React.ComponentType<Props>;
export default _default;
