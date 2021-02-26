import React from 'react';
import { StyleProp, ViewStyle, ViewProps, ImageStyle, TextStyle, ImageSourcePropType } from 'react-native';
import { AvatarProps } from '../avatar';
import { BadgeProps } from '../badge';
import { ImageProps } from '../image';
import { TouchableOpacityProps } from '../touchableOpacity';
export declare type ChipProps = ViewProps & TouchableOpacityProps & {
    /**
     * Chip's size. Number or a width and height object.
     */
    size?: number | {
        width: number;
        height: number;
    };
    /**
     * On Chip press callback
     */
    onPress?: (props: any) => void;
    /**
     * Chip's background color
     */
    backgroundColor?: string;
    /**
     * The Chip borderRadius
     */
    borderRadius?: number;
    /**
     * Chip's container style
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Uses size as minWidth and minHeight - default is true
     */
    useSizeAsMinimum?: boolean;
    /**
     * Disables all internal elements default spacings. Helps reach a custom design
     */
    resetSpacings?: boolean;
    /**
   * Used as testing identifier
   */
    testID?: string;
    /**
     * Main Chip text
     */
    label?: string;
    /**
     * Label's style
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * Badge props object
     */
    badgeProps?: BadgeProps;
    /**
     * Avatar props object
     */
    avatarProps?: AvatarProps;
    /**
     * Additional icon props
     */
    iconProps?: Omit<ImageProps, 'source'>;
    /**
     * Icon style
     */
    iconStyle?: StyleProp<ImageStyle>;
    /**
     * Left icon's source
     */
    iconSource?: ImageSourcePropType;
    /**
     * Right icon's source
     */
    rightIconSource?: ImageSourcePropType;
    /**
     * Adds a dismiss button and serves as its callback
     */
    onDismiss?: (props: any) => void;
    /**
     * Dismiss color
     */
    dismissColor?: string;
    /**
     * Dismiss asset
     */
    dismissIcon?: ImageSourcePropType;
    /**
     * Dismiss style
     */
    dismissIconStyle?: StyleProp<ImageStyle>;
    /**
     * Dismiss container style
     */
    dismissContainerStyle?: StyleProp<ImageStyle>;
};
export declare type ChipPropTypes = ChipProps;
declare const _default: React.ComponentClass<ViewProps & TouchableOpacityProps & {
    /**
     * Chip's size. Number or a width and height object.
     */
    size?: number | {
        width: number;
        height: number;
    } | undefined;
    /**
     * On Chip press callback
     */
    onPress?: ((props: any) => void) | undefined;
    /**
     * Chip's background color
     */
    backgroundColor?: string | undefined;
    /**
     * The Chip borderRadius
     */
    borderRadius?: number | undefined;
    /**
     * Chip's container style
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Uses size as minWidth and minHeight - default is true
     */
    useSizeAsMinimum?: boolean | undefined;
    /**
     * Disables all internal elements default spacings. Helps reach a custom design
     */
    resetSpacings?: boolean | undefined;
    /**
   * Used as testing identifier
   */
    testID?: string | undefined;
    /**
     * Main Chip text
     */
    label?: string | undefined;
    /**
     * Label's style
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * Badge props object
     */
    badgeProps?: BadgeProps | undefined;
    /**
     * Avatar props object
     */
    avatarProps?: AvatarProps | undefined;
    /**
     * Additional icon props
     */
    iconProps?: Pick<ImageProps, "margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV" | "style" | "testID" | "onLayout" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "width" | "height" | "borderRadius" | "borderBottomLeftRadius" | "borderBottomRightRadius" | "borderTopLeftRadius" | "borderTopRightRadius" | "aspectRatio" | "onError" | "onLoad" | "onLoadEnd" | "onLoadStart" | "progressiveRenderingEnabled" | "resizeMode" | "resizeMethod" | "loadingIndicatorSource" | "defaultSource" | "blurRadius" | "capInsets" | "onProgress" | "onPartialLoad" | "fadeDuration" | "cover" | "sourceTransformer" | "assetName" | "assetGroup" | "tintColor" | "supportRTL" | "overlayType" | "overlayColor" | "customOverlayContent" | "errorSource"> | undefined;
    /**
     * Icon style
     */
    iconStyle?: StyleProp<ImageStyle>;
    /**
     * Left icon's source
     */
    iconSource?: number | import("react-native").ImageURISource | import("react-native").ImageURISource[] | undefined;
    /**
     * Right icon's source
     */
    rightIconSource?: number | import("react-native").ImageURISource | import("react-native").ImageURISource[] | undefined;
    /**
     * Adds a dismiss button and serves as its callback
     */
    onDismiss?: ((props: any) => void) | undefined;
    /**
     * Dismiss color
     */
    dismissColor?: string | undefined;
    /**
     * Dismiss asset
     */
    dismissIcon?: number | import("react-native").ImageURISource | import("react-native").ImageURISource[] | undefined;
    /**
     * Dismiss style
     */
    dismissIconStyle?: StyleProp<ImageStyle>;
    /**
     * Dismiss container style
     */
    dismissContainerStyle?: StyleProp<ImageStyle>;
} & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
