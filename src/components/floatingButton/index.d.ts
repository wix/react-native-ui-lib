import React, { PropsWithChildren, PureComponent } from 'react';
import { Animated } from 'react-native';
import { ButtonProps } from '../button';
export declare enum FloatingButtonLayouts {
    VERTICAL = "Vertical",
    HORIZONTAL = "Horizontal"
}
export interface FloatingButtonProps {
    /**
     * Whether the button is visible
     */
    visible?: boolean;
    /**
     * Button element (all Button's component's props)
     */
    button?: PropsWithChildren<ButtonProps>;
    /**
     * Secondary button element (all Button's component's props)
     */
    secondaryButton?: PropsWithChildren<ButtonProps>;
    /**
     * The bottom margin of the button, or secondary button if passed
     */
    bottomMargin?: number;
    /**
     * Whether the buttons get the container's full with (vertical layout only)
     */
    fullWidth?: boolean;
    /**
     * Button layout direction: vertical or horizontal
     */
    buttonLayout?: FloatingButtonLayouts | `${FloatingButtonLayouts}`;
    /**
     * The duration of the button's animations (show/hide)
     */
    duration?: number;
    /**
     * Whether to show/hide the button without animation
     */
    withoutAnimation?: boolean;
    /**
     * Whether to show background overlay
     */
    hideBackgroundOverlay?: boolean;
    /**
     * Used as testing identifier
     * <TestID> - the floatingButton container
     * <TestID>.button - the floatingButton main button
     * <TestID>.secondaryButton - the floatingButton secondaryButton
     */
    testID?: string;
}
/**
 * @description: Hovering button with gradient background
 * @modifiers: margin, background, color
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FloatingButtonScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/FloatingButton/FloatingButton.gif?raw=true
 */
declare class FloatingButton extends PureComponent<FloatingButtonProps> {
    static displayName: string;
    static floatingButtonLayouts: typeof FloatingButtonLayouts;
    static defaultProps: {
        duration: number;
        buttonLayout: FloatingButtonLayouts;
    };
    initialVisibility?: boolean;
    firstLoad: boolean;
    visibleAnimated: Animated.Value;
    constructor(props: FloatingButtonProps);
    componentDidUpdate(prevProps: FloatingButtonProps): void;
    getAnimatedStyle: () => {
        opacity: Animated.Value;
        transform: {
            translateY: Animated.AnimatedInterpolation<string | number>;
        }[];
    };
    get isSecondaryHorizontal(): boolean | undefined;
    get isSecondaryVertical(): boolean | undefined;
    renderButton(): React.JSX.Element;
    renderOverlay: () => React.JSX.Element | undefined;
    renderSecondaryButton(): React.JSX.Element;
    render(): false | React.JSX.Element;
}
declare const _default: React.ForwardRefExoticComponent<FloatingButtonProps & React.RefAttributes<any>> & typeof FloatingButton;
export default _default;
