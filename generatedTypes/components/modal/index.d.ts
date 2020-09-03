import React from 'react';
import { ModalProps as RNModalProps, GestureResponderEvent } from 'react-native';
import { ModalTopBarProps } from './TopBar';
export { ModalTopBarProps };
export interface ModalProps extends RNModalProps {
    /**
     * Blurs the modal background when transparent (iOS only)
     */
    enableModalBlur?: boolean;
    /**
     * A custom view to use as a BlueView instead of the default one
     */
    blurView?: JSX.Element;
    /**
     * allow dismissing a modal when clicking on its background
     */
    onBackgroundPress?: (event: GestureResponderEvent) => void;
    /**
     * the background color of the overlay
     */
    overlayBackgroundColor?: string;
    /**
     * The modal's end-to-end test identifier
     */
    testID?: string;
    /**
     * Overrides the text that's read by the screen reader when the user interacts with the element. By default, the
     * label is constructed by traversing all the children and accumulating all the Text nodes separated by space.
     */
    accessibilityLabel?: string;
}
declare const _default: React.ComponentClass<ModalProps & {
    useCustomTheme?: boolean | undefined;
}, any> & {
    TopBar: React.ComponentClass<ModalTopBarProps & {
        useCustomTheme?: boolean | undefined;
    }, any>;
};
export default _default;
