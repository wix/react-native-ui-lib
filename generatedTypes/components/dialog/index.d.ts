import React from 'react';
import { StyleProp, ViewStyle, ModalPropsIOS, AccessibilityProps } from 'react-native';
import { AlignmentModifiers } from '../../commons/modifiers';
import { PanningDirections } from '../panningViews/panningProvider';
interface RNPartialProps extends Pick<ModalPropsIOS, 'supportedOrientations'>, Pick<AccessibilityProps, 'accessibilityLabel'> {
}
export interface DialogProps extends AlignmentModifiers, RNPartialProps {
    /**
     * Control visibility of the dialog
     */
    visible?: boolean;
    /**
     * Dismiss callback for when clicking on the background
     */
    onDismiss?: (props: any) => void;
    /**
     * The color of the overlay background
     */
    overlayBackgroundColor?: string;
    /**
     * The dialog width (default: 90%)
     */
    width?: string | number;
    /**
     * The dialog height (default: undefined)
     */
    height?: string | number;
    /**
     * The direction of the allowed pan (default is DOWN).
     * Types: UP, DOWN, LEFT and RIGHT (using PanningProvider.Directions.###).
     * Pass null to remove pan.
     */
    panDirection?: PanningDirections;
    /**
     * Whether or not to handle SafeArea
     */
    useSafeArea?: boolean;
    /**
     * Called once the modal has been dismissed (iOS only) - Deprecated, use onDialogDismissed instead
     */
    onModalDismissed?: (props: any) => void;
    /**
     * Called once the dialog has been dismissed completely
     */
    onDialogDismissed?: (props: any) => void;
    /**
     * If this is added only the header will be pannable;
     * this allows for scrollable content (the children of the dialog)
     * props are transferred to the renderPannableHeader
     */
    renderPannableHeader?: (props: any) => JSX.Element;
    /**
     * The props that will be passed to the pannable header
     */
    pannableHeaderProps?: any;
    /**
     * The Dialog`s container style
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Used as a testing identifier
     */
    testID?: string;
}
declare const _default: React.ComponentClass<DialogProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
