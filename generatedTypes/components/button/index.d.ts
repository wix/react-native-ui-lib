import React, { PureComponent } from 'react';
import { ImageStyle, LayoutChangeEvent } from 'react-native';
import { BaseComponentInjectedProps, ForwardRefInjectedProps } from '../../commons/new';
import { ButtonPropTypes, ButtonState } from './type';
declare type Props = ButtonPropTypes & BaseComponentInjectedProps & ForwardRefInjectedProps;
/**
 * @description: Basic button component
 * @extends: TouchableOpacity
 * @extendslink: docs/TouchableOpacity
 * @modifiers: margin, background
 * @gif: https://media.giphy.com/media/xULW8j5WzsuPytqklq/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ButtonsScreen.js
 */
declare class Button extends PureComponent<Props, ButtonState> {
    static displayName: string;
    static defaultProps: {
        iconOnRight: boolean;
    };
    static sizes: {
        xSmall: string;
        small: string;
        medium: string;
        large: string;
    };
    static animationDirection: {
        center: string;
        left: string;
        right: string;
    };
    constructor(props: Props);
    state: {
        size: undefined;
    };
    styles: {
        container: {
            backgroundColor: string;
            justifyContent: "center";
            alignItems: "center";
        };
        containerDisabled: {
            backgroundColor: string;
        };
        innerContainerLink: {
            minWidth: undefined;
            paddingHorizontal: undefined;
            paddingVertical: undefined;
            borderRadius: number;
            backgroundColor: undefined;
        };
        shadowStyle: {
            shadowColor: string;
            shadowOffset: {
                height: number;
                width: number;
            };
            shadowOpacity: number;
            shadowRadius: number;
            elevation: number;
        };
        text: {
            color?: string | undefined;
            fontFamily?: string | undefined;
            fontSize?: number | undefined;
            fontStyle?: "normal" | "italic" | undefined;
            fontWeight?: "200" | "300" | "400" | "600" | "500" | "700" | "800" | "900" | "normal" | "bold" | "100" | undefined;
            letterSpacing?: number | undefined;
            lineHeight?: number | undefined;
            textAlign?: "center" | "left" | "right" | "auto" | "justify" | undefined;
            textDecorationLine?: "none" | "underline" | "line-through" | "underline line-through" | undefined;
            textDecorationStyle?: "solid" | "double" | "dotted" | "dashed" | undefined;
            textDecorationColor?: string | undefined;
            textShadowColor?: string | undefined;
            textShadowOffset?: {
                width: number;
                height: number;
            } | undefined;
            textShadowRadius?: number | undefined;
            textTransform?: "none" | "uppercase" | "capitalize" | "lowercase" | undefined;
            testID?: string | undefined;
            fontVariant?: import("react-native").FontVariant[] | undefined;
            writingDirection?: "auto" | "ltr" | "rtl" | undefined;
            backfaceVisibility?: "visible" | "hidden" | undefined;
            backgroundColor: string;
            borderBottomColor?: string | undefined;
            borderBottomEndRadius?: number | undefined;
            borderBottomLeftRadius?: number | undefined;
            borderBottomRightRadius?: number | undefined;
            borderBottomStartRadius?: number | undefined;
            borderBottomWidth?: number | undefined;
            borderColor?: string | undefined;
            borderEndColor?: string | undefined;
            borderLeftColor?: string | undefined;
            borderLeftWidth?: number | undefined;
            borderRadius?: number | undefined;
            borderRightColor?: string | undefined;
            borderRightWidth?: number | undefined;
            borderStartColor?: string | undefined;
            borderStyle?: "solid" | "dotted" | "dashed" | undefined;
            borderTopColor?: string | undefined;
            borderTopEndRadius?: number | undefined;
            borderTopLeftRadius?: number | undefined;
            borderTopRightRadius?: number | undefined;
            borderTopStartRadius?: number | undefined;
            borderTopWidth?: number | undefined;
            borderWidth?: number | undefined;
            opacity?: number | undefined;
            elevation?: number | undefined;
            alignContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "stretch" | undefined;
            alignItems?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | undefined;
            alignSelf?: "center" | "flex-start" | "flex-end" | "auto" | "stretch" | "baseline" | undefined;
            aspectRatio?: number | undefined;
            borderEndWidth?: string | number | undefined;
            borderStartWidth?: string | number | undefined;
            bottom?: string | number | undefined;
            display?: "flex" | "none" | undefined;
            end?: string | number | undefined;
            flex: number;
            flexBasis?: string | number | undefined;
            flexDirection: "row" | "column" | "row-reverse" | "column-reverse";
            flexGrow?: number | undefined;
            flexShrink?: number | undefined;
            flexWrap?: "wrap" | "nowrap" | "wrap-reverse" | undefined;
            height?: string | number | undefined;
            justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | undefined;
            left?: string | number | undefined;
            margin?: string | number | undefined;
            marginBottom?: string | number | undefined;
            marginEnd?: string | number | undefined;
            marginHorizontal?: string | number | undefined;
            marginLeft?: string | number | undefined;
            marginRight?: string | number | undefined;
            marginStart?: string | number | undefined;
            marginTop?: string | number | undefined;
            marginVertical?: string | number | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
            overflow?: "visible" | "hidden" | "scroll" | undefined;
            padding?: string | number | undefined;
            paddingBottom?: string | number | undefined;
            paddingEnd?: string | number | undefined;
            paddingHorizontal?: string | number | undefined;
            paddingLeft?: string | number | undefined;
            paddingRight?: string | number | undefined;
            paddingStart?: string | number | undefined;
            paddingTop?: string | number | undefined;
            paddingVertical?: string | number | undefined;
            position?: "absolute" | "relative" | undefined;
            right?: string | number | undefined;
            start?: string | number | undefined;
            top?: string | number | undefined;
            width?: string | number | undefined;
            zIndex?: number | undefined;
            direction?: "ltr" | "rtl" | "inherit" | undefined;
            shadowColor?: string | undefined;
            shadowOffset?: {
                width: number;
                height: number;
            } | undefined;
            shadowOpacity?: number | undefined;
            shadowRadius?: number | undefined;
            transform?: (import("react-native").PerpectiveTransform | import("react-native").RotateTransform | import("react-native").RotateXTransform | import("react-native").RotateYTransform | import("react-native").RotateZTransform | import("react-native").ScaleTransform | import("react-native").ScaleXTransform | import("react-native").ScaleYTransform | import("react-native").TranslateXTransform | import("react-native").TranslateYTransform | import("react-native").SkewXTransform | import("react-native").SkewYTransform)[] | undefined;
            transformMatrix?: number[] | undefined;
            rotation?: number | undefined;
            scaleX?: number | undefined;
            scaleY?: number | undefined;
            translateX?: number | undefined;
            translateY?: number | undefined;
            textAlignVertical?: "center" | "top" | "bottom" | "auto" | undefined;
            includeFontPadding?: boolean | undefined;
        };
    };
    componentDidUpdate(prevProps: Props): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onOrientationChanged: () => void;
    onLayout: (event: LayoutChangeEvent) => void;
    get isOutline(): boolean;
    get isFilled(): boolean;
    get isIconButton(): boolean | 0 | undefined;
    getBackgroundColor(): any;
    getActiveBackgroundColor(): any;
    getLabelColor(): string | undefined;
    getLabelSizeStyle(): object;
    getContainerSizeStyle(): any;
    getOutlineStyle(): {
        borderWidth: number;
        borderColor: string;
    } | undefined;
    getBorderRadiusStyle(): {
        borderRadius: number;
    };
    getShadowStyle(): ({
        shadowColor: string;
        shadowOffset: {
            height: number;
            width: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    } | {
        shadowColor: any;
    })[] | undefined;
    getIconStyle(): (ImageStyle | undefined)[];
    getAnimationDirectionStyle(): {
        alignSelf: string;
    } | undefined;
    renderIcon(): any;
    renderLabel(): JSX.Element | null;
    render(): JSX.Element;
}
export { Button };
declare const _default: React.ComponentType<ButtonPropTypes>;
export default _default;
