import React from 'react';
import { StyleProp, ViewStyle, ViewProps, TouchableOpacityProps, ImageStyle, TextStyle, ImageSourcePropType } from 'react-native';
import { BadgeProps } from 'typings';
import { AvatarPropTypes } from '../avatar';
export declare type ChipPropTypes = ViewProps & TouchableOpacityProps & {
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
     * Color of the label.
     */
    labelColor?: string;
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
    avatarProps?: AvatarPropTypes;
    /**
     * Icon's source
     */
    iconSource?: ImageSourcePropType;
    /**
     * Icon's color
     */
    iconColor?: string;
    /**
     * Icon style
     */
    iconStyle?: StyleProp<ImageStyle>;
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
     * Color of the label.
     */
    labelColor?: string | undefined;
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
    avatarProps?: AvatarPropTypes | undefined;
    /**
     * Icon's source
     */
    iconSource?: number | import("react-native").ImageURISource | import("react-native").ImageURISource[] | undefined;
    /**
     * Icon's color
     */
    iconColor?: string | undefined;
    /**
     * Icon style
     */
    iconStyle?: StyleProp<ImageStyle>;
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
