import React from 'react';
import { ViewProps, ScrollViewProps } from 'react-native';
export declare type FadedScrollViewProps = ViewProps & ScrollViewProps & {
    children?: React.ReactNode | React.ReactNode[];
};
declare const _default: React.ComponentClass<FadedScrollViewProps, any> | React.FunctionComponent<FadedScrollViewProps>;
export default _default;
