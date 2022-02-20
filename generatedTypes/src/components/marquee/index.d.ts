import React from 'react';
import { ViewProps } from 'react-native';
export declare type Directions = 'left' | 'right';
export declare type MarqueeProps = ViewProps & {
    duration?: number;
    direction?: Directions;
    width?: number;
    start?: number;
    end?: number;
};
declare const _default: React.ComponentClass<ViewProps & {
    duration?: number | undefined;
    direction?: Directions | undefined;
    width?: number | undefined;
    start?: number | undefined;
    end?: number | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
