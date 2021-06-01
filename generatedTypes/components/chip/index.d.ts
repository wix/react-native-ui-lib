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
     * Display badge as counter (no background)
     */
    useCounter?: boolean;
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
     * Left custom element
     */
    leftElement?: JSX.Element;
    /**
     * Right custom element
     */
    rightElement?: JSX.Element;
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
     * Display badge as counter (no background)
     */
    useCounter?: boolean | undefined;
    /**
     * Avatar props object
     */
    avatarProps?: AvatarProps | undefined;
    /**
     * Additional icon props
     */
    iconProps?: Omit<ImageProps, "source"> | undefined;
    /**
     * Icon style
     */
    iconStyle?: StyleProp<ImageStyle>;
    /**
     * Left icon's source
     */
    iconSource?: ImageSourcePropType | undefined;
    /**
     * Right icon's source
     */
    rightIconSource?: ImageSourcePropType | undefined;
    /**
     * Left custom element
     */
    leftElement?: JSX.Element | undefined;
    /**
     * Right custom element
     */
    rightElement?: JSX.Element | undefined;
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
    dismissIcon?: ImageSourcePropType | undefined;
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
