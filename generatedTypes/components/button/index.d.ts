import React, { PureComponent } from 'react';
import { LayoutChangeEvent, ImageStyle, TextStyle, StyleProp } from 'react-native';
import { BaseComponentInjectedProps, ForwardRefInjectedProps, TypographyModifiers, ColorsModifiers, BackgroundColorModifier, MarginModifiers } from '../../commons/new';
import { TouchableOpacityProps } from '../touchableOpacity';
import { TextPropTypes } from '../text';
export declare enum ButtonSize {
    xSmall = "xSmall",
    small = "small",
    medium = "medium",
    large = "large"
}
export declare enum AnimationDirection {
    center = "center",
    left = "left",
    right = "right"
}
export declare type ButtonPropTypes = TouchableOpacityProps & TypographyModifiers & ColorsModifiers & BackgroundColorModifier & MarginModifiers & {
    /**
     * Text to show inside the button
     */
    label?: string;
    /**
     * The Button text color (inherited from Text component)
     */
    color?: string;
    /**
     * Icon image source
     */
    iconSource?: object | number | Function;
    /**
     * Icon image style
     */
    iconStyle?: StyleProp<ImageStyle>;
    /**
     * Should the icon be right to the label
     */
    iconOnRight?: boolean;
    /**
     * Color of the button background
     */
    backgroundColor?: string;
    /**
     * Size of the button [large, medium, small, xSmall]
     */
    size?: ButtonSize;
    /**
     * Custom border radius.
     */
    borderRadius?: number;
    /**
     * Actions handler
     */
    onPress?: (props: any) => void;
    /**
     * Disable interactions for the component
     */
    disabled?: boolean;
    /**
     * Button will have outline style
     */
    outline?: boolean;
    /**
     * The outline color
     */
    outlineColor?: string;
    /**
     * The outline width
     */
    outlineWidth?: number;
    /**
     * Button will look like a link
     */
    link?: boolean;
    /**
     * label color for when it's displayed as link
     */
    linkColor?: string;
    /**
     * Additional styles for label text
     */
    labelStyle?: TextStyle;
    /**
     * Props that will be passed to the button's Text label.
     */
    labelProps?: TextPropTypes;
    /**
     * should the button act as a coast to coast button (no border radius)
     */
    fullWidth?: boolean;
    /**
     * should the button be a round button
     */
    round?: boolean;
    /**
     * Control shadow visibility (iOS-only)
     */
    enableShadow?: boolean;
    /**
     * avoid inner button padding
     */
    avoidInnerPadding?: boolean;
    /**
     * avoid minimum width constraints
     */
    avoidMinWidth?: boolean;
    /**
     * callback for getting activeBackgroundColor (e.g. (calculatedBackgroundColor, prop) => {...})
     * better set using ThemeManager
     */
    getActiveBackgroundColor?: (backgroundColor: string, props: any) => string;
    /**
     * should animate layout change
     * Note?: For Android you must set 'setLayoutAnimationEnabledExperimental(true)' via RN's 'UIManager'
     */
    animateLayout?: boolean;
    /**
     * the direction of the animation ('left' and 'right' will effect the button's own alignment)
     */
    animateTo?: AnimationDirection;
};
export declare type ButtonState = {
    size?: number;
    borderRadius?: number;
    isLandscape?: boolean;
};
declare type Props = ButtonPropTypes & BaseComponentInjectedProps & ForwardRefInjectedProps;
/**
 * @description: Basic button component
 * @extends: TouchableOpacity
 * @extendslink: docs/TouchableOpacity
 * @modifiers: margin, background
 * @gif: https://media.giphy.com/media/xULW8j5WzsuPytqklq/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ButtonsScreen.tsx
 */
declare class Button extends PureComponent<Props, ButtonState> {
    static displayName: string;
    static defaultProps: {
        iconOnRight: boolean;
    };
    static sizes: typeof ButtonSize;
    static animationDirection: typeof AnimationDirection;
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
            backgroundColor: string;
            flex: number;
            flexDirection: "row";
        } | {
            color?: string | undefined;
            fontFamily?: string | undefined;
            fontSize?: number | undefined;
            fontStyle?: "normal" | "italic" | undefined;
            fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
            letterSpacing?: number | undefined;
            lineHeight?: number | undefined;
            textAlign?: "auto" | "left" | "right" | "center" | "justify" | undefined;
            textDecorationLine?: "none" | "underline" | "line-through" | "underline line-through" | undefined;
            textDecorationStyle?: "solid" | "double" | "dotted" | "dashed" | undefined;
            textDecorationColor?: string | undefined;
            textShadowColor?: string | undefined;
            textShadowOffset?: {
                width: number;
                height: number;
            } | undefined;
            textShadowRadius?: number | undefined;
            textTransform?: "none" | "capitalize" | "uppercase" | "lowercase" | undefined;
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
            alignContent?: "center" | "flex-start" | "flex-end" | "stretch" | "space-between" | "space-around" | undefined;
            alignItems?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | undefined;
            alignSelf?: "auto" | "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | undefined;
            aspectRatio?: number | undefined;
            borderEndWidth?: string | number | undefined;
            borderStartWidth?: string | number | undefined;
            bottom?: string | number | undefined;
            display?: "none" | "flex" | undefined;
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
            textAlignVertical?: "auto" | "center" | "top" | "bottom" | undefined;
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
    getActiveBackgroundColor(): string | undefined;
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
    getIconStyle(): StyleProp<ImageStyle>[];
    getAnimationDirectionStyle(): {
        alignSelf: string;
    } | undefined;
    renderIcon(): any;
    renderLabel(): JSX.Element | null;
    render(): JSX.Element;
}
export { Button };
declare const _default: React.ComponentClass<(import("react-native").TouchableOpacityProps & Partial<Record<import("../../commons/modifiers").AlignmentLiterals, boolean>> & Partial<Record<import("../../commons/modifiers").PositionLiterals, boolean>> & Partial<Record<"padding" | "paddingL" | "paddingT" | "paddingR" | "paddingB" | "paddingH" | "paddingV", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & Partial<Record<"flex" | "flexG" | "flexS", boolean>> & Partial<Record<"br0" | "br10" | "br20" | "br30" | "br40" | "br50" | "br60" | "br100", boolean>> & Partial<Record<"bg", boolean>> & {
    backgroundColor?: string | undefined;
    throttleTime?: number | undefined;
    throttleOptions?: {
        leading: boolean;
        trailing: boolean;
    } | undefined;
    activeBackgroundColor?: string | undefined;
    useNative?: boolean | undefined;
    ref?: any;
} & import("../../commons/modifiers").CustomModifier & {
    /**
     * Text to show inside the button
     */
    label?: string | undefined;
    /**
     * The Button text color (inherited from Text component)
     */
    color?: string | undefined;
    /**
     * Icon image source
     */
    iconSource?: number | object | Function | undefined;
    /**
     * Icon image style
     */
    iconStyle?: StyleProp<ImageStyle>;
    /**
     * Should the icon be right to the label
     */
    iconOnRight?: boolean | undefined;
    /**
     * Color of the button background
     */
    backgroundColor?: string | undefined;
    /**
     * Size of the button [large, medium, small, xSmall]
     */
    size?: ButtonSize | undefined;
    /**
     * Custom border radius.
     */
    borderRadius?: number | undefined;
    /**
     * Actions handler
     */
    onPress?: ((props: any) => void) | undefined;
    /**
     * Disable interactions for the component
     */
    disabled?: boolean | undefined;
    /**
     * Button will have outline style
     */
    outline?: boolean | undefined;
    /**
     * The outline color
     */
    outlineColor?: string | undefined;
    /**
     * The outline width
     */
    outlineWidth?: number | undefined;
    /**
     * Button will look like a link
     */
    link?: boolean | undefined;
    /**
     * label color for when it's displayed as link
     */
    linkColor?: string | undefined;
    /**
     * Additional styles for label text
     */
    labelStyle?: TextStyle | undefined;
    /**
     * Props that will be passed to the button's Text label.
     */
    labelProps?: (import("react-native").TextProps & import("../../commons/modifiers").CustomModifier & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | (import("react-native").TextProps & import("../../commons/modifiers").CustomModifier & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | (import("react-native").TextProps & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & import("../../commons/modifiers").CustomModifier & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | (import("react-native").TextProps & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | undefined;
    /**
     * should the button act as a coast to coast button (no border radius)
     */
    fullWidth?: boolean | undefined;
    /**
     * should the button be a round button
     */
    round?: boolean | undefined;
    /**
     * Control shadow visibility (iOS-only)
     */
    enableShadow?: boolean | undefined;
    /**
     * avoid inner button padding
     */
    avoidInnerPadding?: boolean | undefined;
    /**
     * avoid minimum width constraints
     */
    avoidMinWidth?: boolean | undefined;
    /**
     * callback for getting activeBackgroundColor (e.g. (calculatedBackgroundColor, prop) => {...})
     * better set using ThemeManager
     */
    getActiveBackgroundColor?: ((backgroundColor: string, props: any) => string) | undefined;
    /**
     * should animate layout change
     * Note?: For Android you must set 'setLayoutAnimationEnabledExperimental(true)' via RN's 'UIManager'
     */
    animateLayout?: boolean | undefined;
    /**
     * the direction of the animation ('left' and 'right' will effect the button's own alignment)
     */
    animateTo?: AnimationDirection | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}) | (import("react-native").TouchableOpacityProps & Partial<Record<import("../../commons/modifiers").AlignmentLiterals, boolean>> & Partial<Record<import("../../commons/modifiers").PositionLiterals, boolean>> & Partial<Record<"padding" | "paddingL" | "paddingT" | "paddingR" | "paddingB" | "paddingH" | "paddingV", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & Partial<Record<"flex" | "flexG" | "flexS", boolean>> & Partial<Record<"br0" | "br10" | "br20" | "br30" | "br40" | "br50" | "br60" | "br100", boolean>> & Partial<Record<"bg", boolean>> & {
    backgroundColor?: string | undefined;
    throttleTime?: number | undefined;
    throttleOptions?: {
        leading: boolean;
        trailing: boolean;
    } | undefined;
    activeBackgroundColor?: string | undefined;
    useNative?: boolean | undefined;
    ref?: any;
} & import("../../commons/modifiers").CustomModifier & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & {
    /**
     * Text to show inside the button
     */
    label?: string | undefined;
    /**
     * The Button text color (inherited from Text component)
     */
    color?: string | undefined;
    /**
     * Icon image source
     */
    iconSource?: number | object | Function | undefined;
    /**
     * Icon image style
     */
    iconStyle?: StyleProp<ImageStyle>;
    /**
     * Should the icon be right to the label
     */
    iconOnRight?: boolean | undefined;
    /**
     * Color of the button background
     */
    backgroundColor?: string | undefined;
    /**
     * Size of the button [large, medium, small, xSmall]
     */
    size?: ButtonSize | undefined;
    /**
     * Custom border radius.
     */
    borderRadius?: number | undefined;
    /**
     * Actions handler
     */
    onPress?: ((props: any) => void) | undefined;
    /**
     * Disable interactions for the component
     */
    disabled?: boolean | undefined;
    /**
     * Button will have outline style
     */
    outline?: boolean | undefined;
    /**
     * The outline color
     */
    outlineColor?: string | undefined;
    /**
     * The outline width
     */
    outlineWidth?: number | undefined;
    /**
     * Button will look like a link
     */
    link?: boolean | undefined;
    /**
     * label color for when it's displayed as link
     */
    linkColor?: string | undefined;
    /**
     * Additional styles for label text
     */
    labelStyle?: TextStyle | undefined;
    /**
     * Props that will be passed to the button's Text label.
     */
    labelProps?: (import("react-native").TextProps & import("../../commons/modifiers").CustomModifier & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | (import("react-native").TextProps & import("../../commons/modifiers").CustomModifier & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | (import("react-native").TextProps & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & import("../../commons/modifiers").CustomModifier & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | (import("react-native").TextProps & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | undefined;
    /**
     * should the button act as a coast to coast button (no border radius)
     */
    fullWidth?: boolean | undefined;
    /**
     * should the button be a round button
     */
    round?: boolean | undefined;
    /**
     * Control shadow visibility (iOS-only)
     */
    enableShadow?: boolean | undefined;
    /**
     * avoid inner button padding
     */
    avoidInnerPadding?: boolean | undefined;
    /**
     * avoid minimum width constraints
     */
    avoidMinWidth?: boolean | undefined;
    /**
     * callback for getting activeBackgroundColor (e.g. (calculatedBackgroundColor, prop) => {...})
     * better set using ThemeManager
     */
    getActiveBackgroundColor?: ((backgroundColor: string, props: any) => string) | undefined;
    /**
     * should animate layout change
     * Note?: For Android you must set 'setLayoutAnimationEnabledExperimental(true)' via RN's 'UIManager'
     */
    animateLayout?: boolean | undefined;
    /**
     * the direction of the animation ('left' and 'right' will effect the button's own alignment)
     */
    animateTo?: AnimationDirection | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}) | (import("react-native").TouchableOpacityProps & Partial<Record<import("../../commons/modifiers").AlignmentLiterals, boolean>> & Partial<Record<import("../../commons/modifiers").PositionLiterals, boolean>> & Partial<Record<"padding" | "paddingL" | "paddingT" | "paddingR" | "paddingB" | "paddingH" | "paddingV", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & Partial<Record<"flex" | "flexG" | "flexS", boolean>> & Partial<Record<"br0" | "br10" | "br20" | "br30" | "br40" | "br50" | "br60" | "br100", boolean>> & Partial<Record<"bg", boolean>> & {
    backgroundColor?: string | undefined;
    throttleTime?: number | undefined;
    throttleOptions?: {
        leading: boolean;
        trailing: boolean;
    } | undefined;
    activeBackgroundColor?: string | undefined;
    useNative?: boolean | undefined;
    ref?: any;
} & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & import("../../commons/modifiers").CustomModifier & {
    /**
     * Text to show inside the button
     */
    label?: string | undefined;
    /**
     * The Button text color (inherited from Text component)
     */
    color?: string | undefined;
    /**
     * Icon image source
     */
    iconSource?: number | object | Function | undefined;
    /**
     * Icon image style
     */
    iconStyle?: StyleProp<ImageStyle>;
    /**
     * Should the icon be right to the label
     */
    iconOnRight?: boolean | undefined;
    /**
     * Color of the button background
     */
    backgroundColor?: string | undefined;
    /**
     * Size of the button [large, medium, small, xSmall]
     */
    size?: ButtonSize | undefined;
    /**
     * Custom border radius.
     */
    borderRadius?: number | undefined;
    /**
     * Actions handler
     */
    onPress?: ((props: any) => void) | undefined;
    /**
     * Disable interactions for the component
     */
    disabled?: boolean | undefined;
    /**
     * Button will have outline style
     */
    outline?: boolean | undefined;
    /**
     * The outline color
     */
    outlineColor?: string | undefined;
    /**
     * The outline width
     */
    outlineWidth?: number | undefined;
    /**
     * Button will look like a link
     */
    link?: boolean | undefined;
    /**
     * label color for when it's displayed as link
     */
    linkColor?: string | undefined;
    /**
     * Additional styles for label text
     */
    labelStyle?: TextStyle | undefined;
    /**
     * Props that will be passed to the button's Text label.
     */
    labelProps?: (import("react-native").TextProps & import("../../commons/modifiers").CustomModifier & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | (import("react-native").TextProps & import("../../commons/modifiers").CustomModifier & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | (import("react-native").TextProps & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & import("../../commons/modifiers").CustomModifier & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | (import("react-native").TextProps & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | undefined;
    /**
     * should the button act as a coast to coast button (no border radius)
     */
    fullWidth?: boolean | undefined;
    /**
     * should the button be a round button
     */
    round?: boolean | undefined;
    /**
     * Control shadow visibility (iOS-only)
     */
    enableShadow?: boolean | undefined;
    /**
     * avoid inner button padding
     */
    avoidInnerPadding?: boolean | undefined;
    /**
     * avoid minimum width constraints
     */
    avoidMinWidth?: boolean | undefined;
    /**
     * callback for getting activeBackgroundColor (e.g. (calculatedBackgroundColor, prop) => {...})
     * better set using ThemeManager
     */
    getActiveBackgroundColor?: ((backgroundColor: string, props: any) => string) | undefined;
    /**
     * should animate layout change
     * Note?: For Android you must set 'setLayoutAnimationEnabledExperimental(true)' via RN's 'UIManager'
     */
    animateLayout?: boolean | undefined;
    /**
     * the direction of the animation ('left' and 'right' will effect the button's own alignment)
     */
    animateTo?: AnimationDirection | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}) | (import("react-native").TouchableOpacityProps & Partial<Record<import("../../commons/modifiers").AlignmentLiterals, boolean>> & Partial<Record<import("../../commons/modifiers").PositionLiterals, boolean>> & Partial<Record<"padding" | "paddingL" | "paddingT" | "paddingR" | "paddingB" | "paddingH" | "paddingV", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & Partial<Record<"flex" | "flexG" | "flexS", boolean>> & Partial<Record<"br0" | "br10" | "br20" | "br30" | "br40" | "br50" | "br60" | "br100", boolean>> & Partial<Record<"bg", boolean>> & {
    backgroundColor?: string | undefined;
    throttleTime?: number | undefined;
    throttleOptions?: {
        leading: boolean;
        trailing: boolean;
    } | undefined;
    activeBackgroundColor?: string | undefined;
    useNative?: boolean | undefined;
    ref?: any;
} & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & {
    /**
     * Text to show inside the button
     */
    label?: string | undefined;
    /**
     * The Button text color (inherited from Text component)
     */
    color?: string | undefined;
    /**
     * Icon image source
     */
    iconSource?: number | object | Function | undefined;
    /**
     * Icon image style
     */
    iconStyle?: StyleProp<ImageStyle>;
    /**
     * Should the icon be right to the label
     */
    iconOnRight?: boolean | undefined;
    /**
     * Color of the button background
     */
    backgroundColor?: string | undefined;
    /**
     * Size of the button [large, medium, small, xSmall]
     */
    size?: ButtonSize | undefined;
    /**
     * Custom border radius.
     */
    borderRadius?: number | undefined;
    /**
     * Actions handler
     */
    onPress?: ((props: any) => void) | undefined;
    /**
     * Disable interactions for the component
     */
    disabled?: boolean | undefined;
    /**
     * Button will have outline style
     */
    outline?: boolean | undefined;
    /**
     * The outline color
     */
    outlineColor?: string | undefined;
    /**
     * The outline width
     */
    outlineWidth?: number | undefined;
    /**
     * Button will look like a link
     */
    link?: boolean | undefined;
    /**
     * label color for when it's displayed as link
     */
    linkColor?: string | undefined;
    /**
     * Additional styles for label text
     */
    labelStyle?: TextStyle | undefined;
    /**
     * Props that will be passed to the button's Text label.
     */
    labelProps?: (import("react-native").TextProps & import("../../commons/modifiers").CustomModifier & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | (import("react-native").TextProps & import("../../commons/modifiers").CustomModifier & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | (import("react-native").TextProps & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & import("../../commons/modifiers").CustomModifier & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | (import("react-native").TextProps & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | undefined;
    /**
     * should the button act as a coast to coast button (no border radius)
     */
    fullWidth?: boolean | undefined;
    /**
     * should the button be a round button
     */
    round?: boolean | undefined;
    /**
     * Control shadow visibility (iOS-only)
     */
    enableShadow?: boolean | undefined;
    /**
     * avoid inner button padding
     */
    avoidInnerPadding?: boolean | undefined;
    /**
     * avoid minimum width constraints
     */
    avoidMinWidth?: boolean | undefined;
    /**
     * callback for getting activeBackgroundColor (e.g. (calculatedBackgroundColor, prop) => {...})
     * better set using ThemeManager
     */
    getActiveBackgroundColor?: ((backgroundColor: string, props: any) => string) | undefined;
    /**
     * should animate layout change
     * Note?: For Android you must set 'setLayoutAnimationEnabledExperimental(true)' via RN's 'UIManager'
     */
    animateLayout?: boolean | undefined;
    /**
     * the direction of the animation ('left' and 'right' will effect the button's own alignment)
     */
    animateTo?: AnimationDirection | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}), any> & typeof Button;
export default _default;
