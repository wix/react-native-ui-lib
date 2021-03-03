import React, { Component } from 'react';
import { Animated, FlatListProps, ImageSourcePropType, NativeSyntheticEvent, NativeScrollEvent, LayoutChangeEvent } from 'react-native';
import { ForwardRefInjectedProps } from '../../commons/new';
export interface ScrollBarProps extends FlatListProps<any> {
    /**
       * Whether to use a FlatList. NOTE: you must pass 'data' and 'renderItem' props as well
       */
    useList?: boolean;
    /**
     * The element to use as a container, instead of a View
     */
    containerView?: React.ComponentClass;
    /**
     * The props to pass the container
     */
    containerProps?: object;
    /**
     * The component's height
     */
    height?: number;
    /**
     * The gradient's height, defaults to the component's height
     */
    gradientHeight?: number;
    /**
     * The gradient's width
     */
    gradientWidth?: number;
    /**
     * The gradient's margins for the edge
     */
    gradientMargins?: number;
    /**
     * The gradient's tint color
     */
    gradientColor?: string;
    /**
     * The gradient's image, instead of the default image.
     * NOTE: pass an image for the right-hand side and it will be flipped to match the left-hand side
     */
    gradientImage?: ImageSourcePropType;
    /**
     * The index to currently focus on
     */
    focusIndex?: number;
}
declare type Props = ScrollBarProps & ForwardRefInjectedProps;
declare type State = {
    gradientOpacity: Animated.Value;
    gradientOpacityLeft: Animated.Value;
};
/**
 * @description: Scrollable container with animated gradient overlay for horizontal scroll
 * @extends: ScrollView / FlatList
 */
declare class ScrollBar extends Component<Props, State> {
    static displayName: string;
    static defaultProps: {
        gradientWidth: number;
        gradientMargins: number;
        gradientColor: string;
        focusIndex: number;
    };
    static Item: typeof Item;
    constructor(props: Props);
    private scrollbar;
    private itemsLayouts;
    private contentOffset;
    private scrollContentWidth;
    private containerWidth;
    componentDidUpdate(prevProps: Props): void;
    focusIndex: (index?: number) => void;
    animateGradientOpacity: (offsetX: number, contentWidth: number, containerWidth: number) => void;
    onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onContentSizeChange: (contentWidth: number, contentHeight: number) => void;
    onLayout: (event: LayoutChangeEvent) => void;
    onItemLayout: ({ layout, index }: any) => void;
    renderScrollable(): JSX.Element;
    renderGradient(left: boolean): JSX.Element;
    render(): JSX.Element;
}
declare const Item: {
    ({ children, index, onLayout }: any): JSX.Element;
    displayName: string;
};
declare const _default: React.ComponentClass<ScrollBarProps & {
    useCustomTheme?: boolean | undefined;
}, any> & typeof ScrollBar;
export default _default;
