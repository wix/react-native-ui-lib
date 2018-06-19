/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type ButtonProps = {
    label?: string;
    iconSource?: object | number;
    iconStyle?: object | number | any[];
    iconOnRight?: boolean;
    backgroundColor?: string;
    size?: "xSmall" | "small" | "medium" | "large";
    borderRadius?: number;
    onPress?: (...args: any[]) => any;
    disabled?: boolean;
    outline?: boolean;
    outlineColor?: string;
    outlineWidth?: number;
    link?: boolean;
    linkColor?: string;
    labelStyle?: object | number | any[];
    fullWidth?: boolean;
    enableShadow?: boolean;
    labelProps?: object;
    avoidInnerPadding?: boolean;
    avoidMinWidth?: boolean;
    getActiveBackgroundColor?: (...args: any[]) => any;
    testID?: string;
};
declare type ButtonState = {
    borderRadius: number;
};
/**
 * @description: Basic button component
 * @extends: TouchableOpacity
 * @extendslink: docs/TouchableOpacity
 * @modifiers: margin, background
 * @gif: https://media.giphy.com/media/xULW8j5WzsuPytqklq/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ButtonsScreen.js
 */
export default class Button extends BaseComponent<ButtonProps, ButtonState> {
    static displayName: string;
    static defaultProps: {
        labelStyle: {};
        size: string;
        outline: boolean;
        iconOnRight: boolean;
    };
    static sizes: {
        xSmall: string;
        small: string;
        medium: string;
        large: string;
    };
    constructor(props: any);
    getComponentDimensions(event: any): void;
    generateStyles(): void;
    readonly isOutline: boolean;
    readonly isFilled: boolean;
    getBackgroundColor(): any;
    getActiveBackgroundColor(): any;
    getLabelColor(): any;
    getContentSizeStyle(): any;
    getLabelSizeStyle(): any;
    getContainerSizeStyle(): any;
    getOutlineStyle(): any;
    getBorderRadiusStyle(): {
        borderRadius: any;
    };
    getShadowStyle(): any[];
    getIconStyle(): any[];
    renderIcon(): JSX.Element;
    renderLabel(): JSX.Element;
    render(): JSX.Element;
}
export {};
