import React from 'react';
import { ImageSourcePropType, StyleProp, ViewStyle, ImagePropsBase, ImageStyle, TextStyle } from 'react-native';
import { ImageProps } from '../image';
export declare const STATUS_MODES: {
    ONLINE: string;
    OFFLINE: string;
    AWAY: string;
    NONE: string;
};
export declare const BADGE_POSITIONS: {
    TOP_RIGHT: string;
    TOP_LEFT: string;
    BOTTOM_RIGHT: string;
    BOTTOM_LEFT: string;
};
declare type StatusModes = keyof typeof STATUS_MODES;
declare type BadgePosition = keyof typeof BADGE_POSITIONS;
export declare type AvatarPropTypes = {
    /**
     * Adds fade in animation when Avatar image loads
     */
    animate?: boolean;
    /**
     * Background color for Avatar
     */
    backgroundColor?: string;
    /**
     * Badge location on Avatar
     */
    badgePosition?: BadgePosition;
    /**
     * Badge props passed down to Badge component
     */
    badgeProps?: object;
    /**
     * Additional spacing styles for the container
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * The image source (external or assets)
     */
    source?: ImageSourcePropType;
    /**
     * Image props object
     */
    imageProps?: ImageProps;
    /**
     * Image style object used to pass additional style props
     * by components which render image
     */
    imageStyle?: ImageStyle;
    /**
     * Listener-callback for when an image's (uri) loading
     * starts (equiv. to Image.onLoadStart()).
     */
    onImageLoadStart?: ImagePropsBase["onLoadStart"];
    /**
     * Listener-callback for when an image's (uri) loading
     * either succeeds or fails (equiv. to Image.onLoadEnd()).
     */
    onImageLoadEnd?: ImagePropsBase["onLoadEnd"];
    /**
     * Listener-callback for when an image's (uri) loading
     * fails (equiv. to Image.onError()).
     */
    onImageLoadError?: ImagePropsBase["onError"];
    /**
     * Label that can represent initials
     */
    label?: string;
    /**
     * The label color
     */
    labelColor?: string;
    /**
     * ribbon label to display on the avatar
     */
    ribbonLabel?: string;
    /**
     * ribbon custom style
     */
    ribbonStyle?: StyleProp<ViewStyle>;
    /**
     * ribbon label custom style
     */
    ribbonLabelStyle?: StyleProp<TextStyle>;
    /**
     * Custom ribbon
     */
    customRibbon?: JSX.Element;
    /**
     * Determine if to show online badge
     */
    isOnline?: boolean;
    /**
     * AWAY, ONLINE, OFFLINE or NONE mode (if set to a value other then 'NONE' will override isOnline prop)
     */
    status?: StatusModes;
    /**
     * Custom size for the Avatar
     */
    size?: number;
    /**
     * Press handler
     */
    onPress?: (props: any) => void;
    /**
     * Used as a testing identifier
     */
    testID?: string;
};
declare const _default: React.ComponentClass<AvatarPropTypes, any>;
export default _default;
