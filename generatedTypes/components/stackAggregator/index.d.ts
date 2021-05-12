import React, { PureComponent, ReactNode } from 'react';
import { StyleProp, ViewStyle, Animated, LayoutChangeEvent } from 'react-native';
import { ButtonProps } from '../button';
export interface StackAggregatorProps {
    /**
     * The initial state of the stack
     */
    collapsed?: boolean;
    /**
     * A setting that disables pressability on cards
     */
    disablePresses?: boolean;
    /**
     * The container style
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * The content container style
     */
    contentContainerStyle?: StyleProp<ViewStyle>;
    /**
     * The items border radius
     */
    itemBorderRadius?: number;
    /**
     * Props passed to the 'show less' button
     */
    buttonProps?: ButtonProps;
    /**
     * A callback for item press
     */
    onItemPress?: (index: number) => void;
    /**
     * A callback for collapse state will change (value is future collapsed state)
     */
    onCollapseWillChange?: (future: boolean) => void;
    /**
     * A callback for collapse state change (value is collapsed state)
     */
    onCollapseChanged?: (collapsed: boolean) => void;
}
interface StackAggregatorState {
    collapsed?: boolean;
    firstItemHeight?: number;
}
/**
 * @description: Stack aggregator component
 * @modifiers: margin, padding
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/StackAggregatorScreen.js
 */
declare class StackAggregator extends PureComponent<StackAggregatorProps, StackAggregatorState> {
    static displayName: string;
    state: {
        collapsed: boolean;
        firstItemHeight: undefined;
    };
    itemsCount: number;
    easeOut: import("react-native").EasingFunction;
    animatedScale: Animated.Value;
    animatedOpacity: Animated.Value;
    animatedScaleArray: Animated.Value[];
    animatedContentOpacity: Animated.Value;
    componentDidUpdate(_prevProps: StackAggregatorProps, prevState: StackAggregatorState): void;
    getAnimatedScales(): Animated.Value[];
    getItemScale(index: number): 1 | 0.95 | 0.9;
    animate: () => Promise<[unknown, unknown[]]>;
    animateValues(): Promise<unknown>;
    animateCards(): Promise<unknown[]>;
    close: () => void;
    open: () => void;
    getTop(index: number): number;
    getStyle(index: number): ViewStyle;
    onLayout: ({ nativeEvent: { layout: { height } } }: LayoutChangeEvent) => void | 0;
    onItemPress: (index: number) => void;
    renderItem: (item: ReactNode, index: number) => JSX.Element;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<StackAggregatorProps & {
    useCustomTheme?: boolean | undefined;
}, any> & typeof StackAggregator;
export default _default;
