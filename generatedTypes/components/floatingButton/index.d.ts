import React from 'react';
import { ButtonPropTypes } from '../button';
export interface FloatingButtonProps {
    /**
     * Whether the button is visible
     */
    visible?: boolean;
    /**
     * Button element (all Button's component's props)
     */
    button?: ButtonPropTypes;
    /**
     * Secondary button element (all Button's component's props)
     */
    secondaryButton?: ButtonPropTypes;
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
}
declare const _default: React.ComponentClass<FloatingButtonProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
