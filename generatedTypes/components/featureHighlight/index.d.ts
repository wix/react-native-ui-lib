import React, { Component, ElementRef } from 'react';
import { Animated, StyleProp, TextStyle, TouchableWithoutFeedbackProps, LayoutChangeEvent } from 'react-native';
import { ButtonProps } from '../button';
import { PageControlProps } from '../pageControl';
export declare type HighlightFrame = {
    x: number;
    y: number;
    width: number;
    height: number;
};
declare type RectSize = {
    width: number;
    height: number;
};
declare type Position = {
    left: number;
    top: number;
    width: number;
    height: number;
};
export declare type FeatureHighlightProps = {
    /**
     * Boolean to determine if to present the feature highlight component
     */
    visible: boolean;
    /**
     * Frame of the area to highlight {x, y, width, height}
     */
    highlightFrame?: HighlightFrame;
    /**
     * Callback that extract the ref of the element to be highlighted
     */
    getTarget?: () => any;
    /**
     * Title of the content to be displayed
     */
    title?: string;
    /**
     * Message to be displayed
     */
    message?: string;
    /**
     * Title text style
     */
    titleStyle?: StyleProp<TextStyle>;
    /**
     * Message text style
     */
    messageStyle?: StyleProp<TextStyle>;
    /**
     * Title's max number of lines
     */
    titleNumberOfLines?: number;
    /**
     * Message's max number of lines
     */
    messageNumberOfLines?: number;
    /**
     * Props that will be passed to the dismiss button
     */
    confirmButtonProps?: ButtonProps;
    /**
     * Callback for the background press
     */
    onBackgroundPress?: TouchableWithoutFeedbackProps['onPress'];
    /**
     * Color of the content's background (usually includes alpha for transparency)
     */
    overlayColor?: string;
    /**
     * Color of the content's text
     */
    textColor?: string;
    /**
     * Color of the border around the highlighted element
     */
    borderColor?: string;
    /**
     * Width of the border around the highlighted element
     */
    borderWidth?: number;
    /**
     * Border radius for the border corners around the highlighted element
     */
    borderRadius?: number;
    /**
     * The minimum size of the highlighted component (Android API 21+, and only when passing a ref in 'getTarget')
     */
    minimumRectSize?: RectSize;
    /**
     * The padding of the highlight frame around the highlighted element's frame (only when passing ref in 'getTarget')
     */
    innerPadding?: number;
    /**
     * PageControl component's props
     */
    pageControlProps?: PageControlProps;
    testID?: string;
};
interface State {
    fadeAnim: Animated.Value;
    contentTopPosition?: number;
    node?: number | null;
    getTarget?: () => any;
}
/**
 * @description: FeatureHighlight component for feature discovery
 * @notes: 1) FeatureHighlight component must be a direct child of the root view returned in render().; 2) If the element to be highlighted doesn't have a style attribute add 'style={{opacity: 1}}' so the Android OS can detect it.
 * @important: FeatureHighlight uses a native library. You MUST add and link the native library to both iOS and Android projects. For instruction please see
 * @importantLink: https://facebook.github.io/react-native/docs/linking-libraries-ios.html
 * @extends: HighlighterOverlayView
 * @extendsLink: docs/HighlighterOverlayView
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/FeatureHighlight/FeatureHighlight.gif?raw=true
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FeatureHighlightScreen.js
 */
declare class FeatureHighlight extends Component<FeatureHighlightProps, State> {
    static displayName: string;
    contentHeight: number;
    targetPosition?: Position;
    viewRef?: ElementRef<any>;
    constructor(props: FeatureHighlightProps);
    static defaultProps: {
        minimumRectSize: {
            width: number;
            height: number;
        };
        innerPadding: number;
    };
    componentDidMount(): void;
    static getDerivedStateFromProps(nextProps: FeatureHighlightProps, prevState: State): {
        getTarget: (() => any) | undefined;
        node: number;
    } | null;
    shouldSetTargetPosition: (nextProps: FeatureHighlightProps) => boolean;
    componentDidUpdate(nextProps: FeatureHighlightProps): void;
    setAccessibilityFocus(ref: any): void;
    static findTargetNode(target: Component): number | null;
    animate(toValue: number): void;
    setTargetPosition(props?: Readonly<FeatureHighlightProps> & Readonly<{
        children?: React.ReactNode;
    }>): void;
    getContentPosition(): number;
    setContentPosition(): void;
    getComponentDimensions(event: LayoutChangeEvent): void;
    onPress: () => void;
    renderHighlightMessage(): JSX.Element;
    render(): JSX.Element | null;
}
export { FeatureHighlight as testable };
declare const _default: React.ComponentClass<FeatureHighlightProps & {
    useCustomTheme?: boolean | undefined;
}, any> & typeof FeatureHighlight;
export default _default;
