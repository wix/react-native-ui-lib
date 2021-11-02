import React, { Component, ReactElement, ElementRef } from 'react';
import { Animated, GestureResponderEvent, ImageSourcePropType, ImageStyle, StyleProp, TextStyle, ViewStyle, LayoutChangeEvent, View as RNView } from 'react-native';
declare enum TARGET_POSITIONS {
    LEFT = "left",
    RIGHT = "right",
    CENTER = "center"
}
declare enum HintPositions {
    TOP = "top",
    BOTTOM = "bottom"
}
interface HintTargetFrame {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}
declare type Position = Pick<ViewStyle, 'top' | 'bottom' | 'left' | 'right'>;
declare type HintPositionStyle = Position & Pick<ViewStyle, 'alignItems'>;
declare type Paddings = Pick<ViewStyle, 'paddingLeft' | 'paddingRight' | 'paddingVertical' | 'paddingHorizontal'>;
export interface HintProps {
    /**
     * Control the visibility of the hint
     */
    visible?: boolean;
    /**
     * The hint background color
     */
    color?: string;
    /**
     * The hint message
     */
    message?: string | ReactElement;
    /**
     * The hint message custom style
     */
    messageStyle?: StyleProp<TextStyle>;
    /**
     * Icon to show next to the hint's message
     */
    icon?: ImageSourcePropType;
    /**
     * The icon's style
     */
    iconStyle?: StyleProp<ImageStyle>;
    /**
     * The hint's position
     */
    position?: HintPositions;
    /**
     * Provide custom target position instead of wrapping a child
     */
    targetFrame?: HintTargetFrame;
    /**
     * Show side tips instead of the middle tip
     */
    useSideTip?: boolean;
    /**
     * The hint's border radius
     */
    borderRadius?: number;
    /**
     * Hint margins from screen edges
     */
    edgeMargins?: number;
    /**
     * Hint offset from target
     */
    offset?: number;
    /**
     * Callback for Hint press
     */
    onPress?: () => void;
    /**
     * Callback for the background press
     */
    onBackgroundPress?: (event: GestureResponderEvent) => void;
    /**
     * Color for background overlay (require onBackgroundPress)
     */
    backdropColor?: string;
    /**
     * The hint container width
     */
    containerWidth?: number;
    /**
     * Custom content element to render inside the hint container
     */
    customContent?: JSX.Element;
    /**
     * Remove all hint's paddings
     */
    removePaddings?: boolean;
    /**
     * Enable shadow (for hint with white background only)
     */
    enableShadow?: boolean;
    /**
     * The hint's test identifier
     */
    testID?: string;
    /**
     * Additional styling
     */
    style?: StyleProp<ViewStyle>;
}
interface HintState {
    targetLayout?: HintTargetFrame;
    targetLayoutInWindow?: HintTargetFrame;
    hintUnmounted: boolean;
}
/**
 * @description: Hint component for displaying a tooltip over wrapped component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/HintsScreen.tsx
 * @notes: You can either wrap a component or pass a specific targetFrame
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Hint/Hint.gif?raw=true
 */
declare class Hint extends Component<HintProps, HintState> {
    static displayName: string;
    static defaultProps: {
        position: HintPositions;
    };
    static positions: typeof HintPositions;
    targetRef: ElementRef<typeof RNView> | null;
    hintRef: ElementRef<typeof RNView> | null;
    animationDuration: number;
    state: {
        targetLayoutInWindow: undefined;
        targetLayout: HintTargetFrame | undefined;
        hintUnmounted: boolean;
    };
    visibleAnimated: Animated.Value;
    componentDidUpdate(prevProps: HintProps): void;
    animateHint: () => void;
    toggleAnimationEndedToRemoveHint: () => void;
    focusAccessibilityOnHint: () => void;
    setTargetRef: (ref: ElementRef<typeof RNView>) => void;
    setHintRef: (ref: ElementRef<typeof RNView>) => void;
    onTargetLayout: ({ nativeEvent: { layout } }: LayoutChangeEvent) => void;
    getAccessibilityInfo(): {
        accessible: boolean;
        accessibilityLabel: string;
    } | undefined;
    get containerWidth(): number;
    get targetLayout(): HintTargetFrame | undefined;
    get showHint(): boolean;
    get tipSize(): {
        width: number;
        height: number;
    };
    get hintOffset(): number;
    get edgeMargins(): number;
    get useSideTip(): boolean;
    getTargetPositionOnScreen(): TARGET_POSITIONS;
    getContainerPosition(): {
        top: number | undefined;
        left: number | undefined;
    } | undefined;
    getHintPosition(): HintPositionStyle;
    getHintPadding(): Paddings;
    getHintAnimatedStyle: () => {
        opacity: Animated.Value;
        transform: {
            translateY: Animated.AnimatedInterpolation;
        }[];
    };
    getTipPosition(): Position;
    renderHintTip(): JSX.Element;
    renderContent(): JSX.Element;
    renderHint(): JSX.Element | undefined;
    renderHintContainer(): JSX.Element;
    renderMockChildren(): JSX.Element | undefined;
    renderChildren(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
    render(): {} | null;
}
declare const _default: React.ComponentClass<HintProps & {
    useCustomTheme?: boolean | undefined;
}, any> & typeof Hint;
export default _default;
