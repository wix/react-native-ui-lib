/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type ModalProps = {
    enableModalBlur?: boolean;
    blurView?: JSX.Element;
    onBackgroundPress?: (...args: any[]) => any;
    overlayBackgroundColor?: string;
};
/**
 * @description: Component that present content on top of the invoking screen
 * @extends: Modal
 * @extendslink: https://facebook.github.io/react-native/docs/modal.html
 * @gif: https://media.giphy.com/media/3oFzmfSX8KgvctI4Ks/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ModalScreen.js
 */
export default class Modal extends BaseComponent<ModalProps, {}> {
    static displayName: string;
    renderTouchableOverlay(): JSX.Element;
    render(): JSX.Element;
}
export {};
