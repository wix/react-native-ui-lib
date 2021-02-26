import React, { Component } from 'react';
import { ModalProps as RNModalProps, GestureResponderEvent } from 'react-native';
import TopBar, { ModalTopBarProps } from './TopBar';
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
/**
 * @description: Component that present content on top of the invoking screen
 * @extends: Modal
 * @extendslink: https://facebook.github.io/react-native/docs/modal.html
 * @gif: https://media.giphy.com/media/3oFzmfSX8KgvctI4Ks/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ModalScreen.tsx
 */
declare class Modal extends Component<ModalProps> {
    static displayName: string;
    static TopBar: typeof TopBar;
    constructor(props: ModalProps);
    renderTouchableOverlay(): JSX.Element | undefined;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<ModalProps & {
    useCustomTheme?: boolean | undefined;
}, any> & typeof Modal;
export default _default;
