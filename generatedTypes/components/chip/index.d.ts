import React from 'react';
import { StyleProp, ViewStyle, ViewProps, TouchableOpacityProps, ImageStyle, TextStyle, ImageSourcePropType } from 'react-native';
import { AvatarProps, BadgeProps } from 'typings';
interface ChipProps {
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
     * Shows a Badge based counter
     */
    counterLabel?: string;
    /**
     * Used to customize the counter label - extends Badge component props
     */
    counterProps?: BadgeProps;
    /**
   * Displays counter with simpler Ui preset
   */
    counterBasicUi?: boolean;
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
}
declare type Props = ChipProps & ViewProps & TouchableOpacityProps;
declare const _default: React.ComponentClass<Props, any> | React.FunctionComponent<Props>;
export default _default;
