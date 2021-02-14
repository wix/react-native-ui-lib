import React, { PureComponent } from 'react';
import { ImageSourcePropType, ImageStyle, StyleProp, TextStyle, TouchableOpacityProps, ViewStyle, ViewProps } from 'react-native';
declare const LABEL_FORMATTER_VALUES: readonly [1, 2, 3, 4];
export declare enum BADGE_SIZES {
    pimpleSmall = 6,
    pimpleBig = 10,
    pimpleHuge = 14,
    small = 16,
    default = 20,
    large = 24
}
declare type LabelFormatterValues = typeof LABEL_FORMATTER_VALUES[number];
export declare type BadgeSizes = keyof typeof BADGE_SIZES;
export declare type BadgeProps = ViewProps & TouchableOpacityProps & {
    /**
     * Text to show inside the badge.
     * Not passing a label (undefined) will present a pimple badge.
     */
    label?: string;
    /**
     * Color of the badge background
     */
    backgroundColor?: string;
    /**
     * the badge size (default, small)
     */
    size: BadgeSizes | number;
    /**
     * Press handler
     */
    onPress?: (props: any) => void;
    /**
     * Defines how far a touch event can start away from the badge.
     */
    hitSlop?: ViewProps['hitSlop'];
    /**
     * width of border around the badge
     */
    borderWidth?: number;
    /**
     * radius of border around the badge
     */
    borderRadius?: number;
    /**
     * color of border around the badge
     */
    borderColor?: ImageStyle['borderColor'];
    /**
     * Additional styles for the top container
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Additional styles for the badge label
     */
    labelStyle?: TextStyle;
    /**
     * Receives a number from 1 to 4, representing the label's max digit length.
     * Beyond the max number for that digit length, a "+" will show at the end.
     * If set to a value not included in LABEL_FORMATTER_VALUES, no formatting will occur.
     * Example: labelLengthFormater={2}, label={124}, label will present "99+".
     */
    labelFormatterLimit?: LabelFormatterValues;
    /**
     * Renders an icon badge
     */
    icon?: ImageSourcePropType;
    /**
     * Additional styling to badge icon
     */
    iconStyle?: object;
    /**
     * Additional props passed to icon
     */
    iconProps?: object;
    /**
     * Custom element to render instead of an icon
     */
    customElement?: JSX.Element;
    /**
     * Use to identify the badge in tests
     */
    testId?: string;
};
/**
 * @description: Round colored badge, typically used to show a number
 * @extends: Animatable.View
 * @extendslink: https://github.com/oblador/react-native-animatable
 * @image: https://user-images.githubusercontent.com/33805983/34480753-df7a868a-efb6-11e7-9072-80f5c110a4f3.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/BadgesScreen.tsx
 */
declare class Badge extends PureComponent<BadgeProps> {
    styles: ReturnType<typeof createStyles>;
    static displayName: string;
    static defaultProps: {
        size: string;
    };
    constructor(props: BadgeProps);
    getAccessibilityProps(): {
        accessible: boolean;
        accessibilityRole: string;
        accessibilityLabel: string | undefined;
    };
    isSmallBadge(): boolean;
    getBadgeSizeStyle(): any;
    getFormattedLabel(): any;
    getBorderStyling(): ViewStyle;
    renderLabel(): JSX.Element | undefined;
    renderCustomElement(): JSX.Element | undefined;
    renderIcon(): 0 | JSX.Element | undefined;
    render(): JSX.Element;
}
declare function createStyles(props: BadgeProps): {
    badge: {
        alignSelf: "flex-start";
        borderRadius: number;
        backgroundColor: string | undefined;
        alignItems: "center";
        justifyContent: "center";
        overflow: "hidden";
    };
    label: {
        color: string;
        backgroundColor: string;
        fontFamily?: string | undefined;
        fontSize?: number | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
        letterSpacing?: number | undefined;
        lineHeight?: number | undefined;
        textAlign?: "auto" | "left" | "right" | "center" | "justify" | undefined;
        textDecorationLine?: "none" | "underline" | "line-through" | "underline line-through" | undefined;
        textDecorationStyle?: "solid" | "double" | "dotted" | "dashed" | undefined;
        textDecorationColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
        textShadowColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
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
        borderBottomColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
        borderBottomEndRadius?: number | undefined;
        borderBottomLeftRadius?: number | undefined;
        borderBottomRightRadius?: number | undefined;
        borderBottomStartRadius?: number | undefined;
        borderBottomWidth?: number | undefined;
        borderColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
        borderEndColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
        borderLeftColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
        borderLeftWidth?: number | undefined;
        borderRadius?: number | undefined;
        borderRightColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
        borderRightWidth?: number | undefined;
        borderStartColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
        borderStyle?: "solid" | "dotted" | "dashed" | undefined;
        borderTopColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
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
        flex?: number | undefined;
        flexBasis?: string | number | undefined;
        flexDirection?: "row" | "column" | "row-reverse" | "column-reverse" | undefined;
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
        shadowColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
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
    labelSmall: {
        lineHeight: undefined;
        color?: string | typeof import("react-native").OpaqueColorValue | undefined;
        fontFamily?: string | undefined;
        fontSize?: number | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
        letterSpacing?: number | undefined;
        textAlign?: "auto" | "left" | "right" | "center" | "justify" | undefined;
        textDecorationLine?: "none" | "underline" | "line-through" | "underline line-through" | undefined;
        textDecorationStyle?: "solid" | "double" | "dotted" | "dashed" | undefined;
        textDecorationColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
        textShadowColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
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
        backgroundColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
        borderBottomColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
        borderBottomEndRadius?: number | undefined;
        borderBottomLeftRadius?: number | undefined;
        borderBottomRightRadius?: number | undefined;
        borderBottomStartRadius?: number | undefined;
        borderBottomWidth?: number | undefined;
        borderColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
        borderEndColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
        borderLeftColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
        borderLeftWidth?: number | undefined;
        borderRadius?: number | undefined;
        borderRightColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
        borderRightWidth?: number | undefined;
        borderStartColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
        borderStyle?: "solid" | "dotted" | "dashed" | undefined;
        borderTopColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
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
        flex?: number | undefined;
        flexBasis?: string | number | undefined;
        flexDirection?: "row" | "column" | "row-reverse" | "column-reverse" | undefined;
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
        shadowColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
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
export { Badge };
declare const _default: React.ComponentClass<ViewProps & TouchableOpacityProps & {
    /**
     * Text to show inside the badge.
     * Not passing a label (undefined) will present a pimple badge.
     */
    label?: string | undefined;
    /**
     * Color of the badge background
     */
    backgroundColor?: string | undefined;
    /**
     * the badge size (default, small)
     */
    size: number | "small" | "default" | "pimpleSmall" | "pimpleBig" | "pimpleHuge" | "large";
    /**
     * Press handler
     */
    onPress?: ((props: any) => void) | undefined;
    /**
     * Defines how far a touch event can start away from the badge.
     */
    hitSlop?: import("react-native").Insets | undefined;
    /**
     * width of border around the badge
     */
    borderWidth?: number | undefined;
    /**
     * radius of border around the badge
     */
    borderRadius?: number | undefined;
    /**
     * color of border around the badge
     */
    borderColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
    /**
     * Additional styles for the top container
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Additional styles for the badge label
     */
    labelStyle?: TextStyle | undefined;
    /**
     * Receives a number from 1 to 4, representing the label's max digit length.
     * Beyond the max number for that digit length, a "+" will show at the end.
     * If set to a value not included in LABEL_FORMATTER_VALUES, no formatting will occur.
     * Example: labelLengthFormater={2}, label={124}, label will present "99+".
     */
    labelFormatterLimit?: 1 | 3 | 2 | 4 | undefined;
    /**
     * Renders an icon badge
     */
    icon?: number | import("react-native").ImageURISource | import("react-native").ImageURISource[] | undefined;
    /**
     * Additional styling to badge icon
     */
    iconStyle?: object | undefined;
    /**
     * Additional props passed to icon
     */
    iconProps?: object | undefined;
    /**
     * Custom element to render instead of an icon
     */
    customElement?: JSX.Element | undefined;
    /**
     * Use to identify the badge in tests
     */
    testId?: string | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}, any> & typeof Badge;
export default _default;
