import React from 'react';
import { ViewProps, ScrollViewProps } from 'react-native';
import { ForwardRefInjectedProps } from '../../commons/new';
export declare type FadedScrollViewProps = ViewProps & ScrollViewProps & {
    children?: React.ReactNode | React.ReactNode[];
};
interface Statics {
    scrollTo(y?: number | {
        x?: number | undefined;
        y?: number | undefined;
        animated?: boolean | undefined;
    }, x?: number, animated?: boolean): void;
    isScrollEnabled: () => boolean;
}
declare const _default: React.ComponentType<ViewProps & ScrollViewProps & {
    children?: React.ReactNode | React.ReactNode[];
} & ForwardRefInjectedProps> & Statics;
export default _default;
