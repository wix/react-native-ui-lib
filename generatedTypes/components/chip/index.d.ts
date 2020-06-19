import React from 'react';
import { StyleProp, ViewStyle, ViewProps, TouchableOpacityProps, ImageStyle, TextStyle, ImageSourcePropType } from 'react-native';
import { AvatarProps, BadgeProps } from 'typings';
interface ChipProps {
    /**
     * Chip's size. Number or a width and height object.
     */
    size?: number | object;
    /**
     * On Chip press callback
     */
    onPress?: (props: any) => void;
    /**
     * Chip's background color
     */
    backgroundColor?: string;
    /**
     * Sets size to use minWidth and minHeight - default is true
     */
    minSize?: boolean;
    /**
     * Disables all internal elements default spacings. Helps reach a custom design
     */
    resetSpacings?: boolean;
    /**
     * The Chip borderRadius
     */
    borderRadius?: number;
    /**
     * Displays counter as a Badge
     */
    useBadge?: boolean;
    /**
     * Badge props object.
     */
    badgeProps?: BadgeProps;
    /**
     * Chip's container style
     */
    containerStyle?: StyleProp<ViewStyle>;
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
     * Text to show to the right of the label or inside the Badge.
     */
    counterLabel?: string;
    /**
     * Color of the counter label.
     */
    counterColor?: string;
    /**
     * Counter's style
     */
    counterStyle?: StyleProp<TextStyle>;
    /**
     * Adds a dismiss button and serves as its callback
     */
    onDismiss?: (props: any) => void;
    /**
     * Dismiss (X button) color
     */
    dismissColor?: string;
    /**
     * Dismiss (X button) asset
     */
    dismissIcon?: ImageSourcePropType;
    /**
     * Dismiss (X button) style
     */
    dismissIconStyle?: StyleProp<ImageStyle>;
    /**
     * Dismiss (X button) container style
     */
    dismissContainerStyle?: StyleProp<ImageStyle>;
    /**
     * Avatar props object
     */
    avatar?: AvatarProps;
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
     * Used as testing identifier
     */
    testID?: string;
}
declare type Props = ChipProps & ViewProps & TouchableOpacityProps;
declare const _default: React.ComponentClass<Props, any> | React.FunctionComponent<Props>;
export default _default;
