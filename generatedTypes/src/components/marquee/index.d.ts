import React from 'react';
import { ViewProps } from 'react-native';
export declare type Directions = 'left' | 'right';
export declare type MarqueeProps = ViewProps & {
    direction?: Directions;
    duration?: number;
    width?: number;
};
declare const _default: React.ComponentClass<ViewProps & {
    direction?: Directions | undefined;
    duration?: number | undefined;
    width?: number | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
