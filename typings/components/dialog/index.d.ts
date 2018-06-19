/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type DialogProps = {
    visible?: boolean;
    onDismiss?: (...args: any[]) => any;
    overlayBackgroundColor?: string;
    width?: number | string;
    height?: number | string;
    animationConfig?: object;
    containerStyle?: object | number | any[];
};
/**
 * @description: Dialog component for displaying custom content inside a popup dialog
 * @notes: Use alignment modifiers to control the dialog positon (top, bottom, centerV, centerH, etc... by default the dialog is align to center)
 * @modifiers: alignment
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/DialogScreen.js
 * @gif: https://media.giphy.com/media/9S58XdLCoUiLzAc1b1/giphy.gif
 */
declare class Dialog extends BaseComponent<DialogProps, {}> {
    static displayName: string;
    static defaultProps: {
        overlayBackgroundColor: any;
        width: string;
        height: string;
    };
    generateStyles(): void;
    getAnimationConfig(): any;
    render(): JSX.Element;
}
export default Dialog;
