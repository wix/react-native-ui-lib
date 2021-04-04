import React, { PropsWithChildren } from 'react';
import { ButtonProps } from '../button';
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
     */
    testID?: string;
}
declare const _default: React.ComponentClass<FloatingButtonProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
