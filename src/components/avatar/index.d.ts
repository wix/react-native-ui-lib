import React, { PropsWithChildren } from 'react';
import { StyleProp, ViewStyle, ImagePropsBase, ImageStyle, TextStyle, TextProps, AccessibilityProps } from 'react-native';
import { BadgeProps } from '../badge';
import { ImageProps } from '../image';
import { AnimatedImageProps } from '../animatedImage';
export declare enum BadgePosition {
    TOP_RIGHT = "TOP_RIGHT",
    TOP_LEFT = "TOP_LEFT",
    BOTTOM_RIGHT = "BOTTOM_RIGHT",
    BOTTOM_LEFT = "BOTTOM_LEFT"
}
export type AutoColorsProps = {
    /**
     * Avatar colors to be used when useAutoColors is true
     */
    avatarColors?: string[];
    /**
     * Replace the default hashing function (name -> number)
     */
    hashFunction?: (name?: string) => number;
    /**
     * Background color in cases where the getBackgroundColor returns undefined.
     */
    defaultColor?: string;
};
export type AvatarProps = Pick<AccessibilityProps, 'accessibilityLabel'> & PropsWithChildren<{
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
    badgePosition?: `${BadgePosition}` | BadgePosition;
    /**
     * Badge props passed down to Badge component
     */
    badgeProps?: BadgeProps;
    /**
     * Additional spacing styles for the container
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * The image source (external or assets)
     */
    source?: ImageProps['source'];
    /**
     * Image props object
     */
    imageProps?: Partial<ImageProps & AnimatedImageProps>;
    /**
     * Image style object used to pass additional style props
     * by components which render image
     */
    imageStyle?: ImageStyle;
    /**
     * Listener-callback for when an image's (uri) loading
     * starts (equiv. to Image.onLoadStart()).
     */
    onImageLoadStart?: ImagePropsBase['onLoadStart'];
    /**
     * Listener-callback for when an image's (uri) loading
     * either succeeds or fails (equiv. to Image.onLoadEnd()).
     */
    onImageLoadEnd?: ImagePropsBase['onLoadEnd'];
    /**
     * Listener-callback for when an image's (uri) loading
     * fails (equiv. to Image.onError()).
     */
    onImageLoadError?: ImagePropsBase['onError'];
    /**
     * The name of the avatar user.
     * If no label is provided, the initials will be generated from the name.
     * autoColorsConfig will use the name to create the background color of the Avatar.
     */
    name?: string;
    /**
     * Hash the name (or label) to get a color, so each name will have a specific color.
     * Default is false.
     */
    useAutoColors?: boolean;
    /**
     * Send this to use the name to infer a backgroundColor
     */
    autoColorsConfig?: AutoColorsProps;
    /**
     * Label that can represent initials
     */
    label?: string;
    /**
     * The label color
     */
    labelColor?: string;
    labelEllipsizeMode?: TextProps['ellipsizeMode'];
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
}>;
interface Statics {
    badgePosition: typeof BadgePosition;
}
/**
 * @description: Avatar component for displaying user profile images
 * @extends: TouchableOpacity, Image
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Avatar/Avarat_1.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Avatar/Avarat_2.png?raw=true
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/AvatarsScreen.tsx
 */
declare const Avatar: React.ForwardRefExoticComponent<Pick<AccessibilityProps, "accessibilityLabel"> & {
    /**
     * Adds fade in animation when Avatar image loads
     */
    animate?: boolean | undefined;
    /**
     * Background color for Avatar
     */
    backgroundColor?: string | undefined;
    /**
     * Badge location on Avatar
     */
    badgePosition?: "TOP_RIGHT" | "TOP_LEFT" | "BOTTOM_RIGHT" | "BOTTOM_LEFT" | BadgePosition | undefined;
    /**
     * Badge props passed down to Badge component
     */
    badgeProps?: BadgeProps | undefined;
    /**
     * Additional spacing styles for the container
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * The image source (external or assets)
     */
    source?: ImageProps['source'];
    /**
     * Image props object
     */
    imageProps?: Partial<Omit<import("react-native").ImageProps, "source"> & Pick<import("react-native").ImageBackgroundProps, "imageStyle"> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & import("../..").RecorderProps & {
        sourceTransformer?: ((props: any) => import("../image").ImageSourceType) | undefined;
        assetName?: string | undefined;
        assetGroup?: string | undefined;
        tintColor?: string | undefined;
        supportRTL?: boolean | undefined;
        cover?: boolean | undefined;
        aspectRatio?: number | undefined;
        overlayType?: string | undefined;
        overlayIntensity?: import("../overlay").OverlayIntensityType | undefined;
        overlayColor?: string | undefined;
        customOverlayContent?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactElement<any, string | React.JSXElementConstructor<any>>[] | undefined;
        errorSource?: import("../image").ImageSourceType;
        imageId?: string | undefined;
        useBackgroundContainer?: boolean | undefined;
        width?: string | number | undefined;
        height?: string | number | undefined;
        source: import("../image").ImageSourceType;
    } & AnimatedImageProps> | undefined;
    /**
     * Image style object used to pass additional style props
     * by components which render image
     */
    imageStyle?: ImageStyle | undefined;
    /**
     * Listener-callback for when an image's (uri) loading
     * starts (equiv. to Image.onLoadStart()).
     */
    onImageLoadStart?: ImagePropsBase['onLoadStart'];
    /**
     * Listener-callback for when an image's (uri) loading
     * either succeeds or fails (equiv. to Image.onLoadEnd()).
     */
    onImageLoadEnd?: ImagePropsBase['onLoadEnd'];
    /**
     * Listener-callback for when an image's (uri) loading
     * fails (equiv. to Image.onError()).
     */
    onImageLoadError?: ImagePropsBase['onError'];
    /**
     * The name of the avatar user.
     * If no label is provided, the initials will be generated from the name.
     * autoColorsConfig will use the name to create the background color of the Avatar.
     */
    name?: string | undefined;
    /**
     * Hash the name (or label) to get a color, so each name will have a specific color.
     * Default is false.
     */
    useAutoColors?: boolean | undefined;
    /**
     * Send this to use the name to infer a backgroundColor
     */
    autoColorsConfig?: AutoColorsProps | undefined;
    /**
     * Label that can represent initials
     */
    label?: string | undefined;
    /**
     * The label color
     */
    labelColor?: string | undefined;
    labelEllipsizeMode?: TextProps['ellipsizeMode'];
    /**
     * ribbon label to display on the avatar
     */
    ribbonLabel?: string | undefined;
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
    customRibbon?: JSX.Element | undefined;
    /**
     * Custom size for the Avatar
     */
    size?: number | undefined;
    /**
     * Press handler
     */
    onPress?: ((props: any) => void) | undefined;
    /**
     * Used as a testing identifier
     */
    testID?: string | undefined;
} & {
    children?: React.ReactNode;
} & React.RefAttributes<any>>;
export { Avatar };
declare const _default: React.ForwardRefExoticComponent<Pick<AccessibilityProps, "accessibilityLabel"> & {
    /**
     * Adds fade in animation when Avatar image loads
     */
    animate?: boolean | undefined;
    /**
     * Background color for Avatar
     */
    backgroundColor?: string | undefined;
    /**
     * Badge location on Avatar
     */
    badgePosition?: "TOP_RIGHT" | "TOP_LEFT" | "BOTTOM_RIGHT" | "BOTTOM_LEFT" | BadgePosition | undefined;
    /**
     * Badge props passed down to Badge component
     */
    badgeProps?: BadgeProps | undefined;
    /**
     * Additional spacing styles for the container
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * The image source (external or assets)
     */
    source?: import("../image").ImageSourceType;
    /**
     * Image props object
     */
    imageProps?: Partial<Omit<import("react-native").ImageProps, "source"> & Pick<import("react-native").ImageBackgroundProps, "imageStyle"> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & import("../..").RecorderProps & {
        sourceTransformer?: ((props: any) => import("../image").ImageSourceType) | undefined;
        assetName?: string | undefined;
        assetGroup?: string | undefined;
        tintColor?: string | undefined;
        supportRTL?: boolean | undefined;
        cover?: boolean | undefined;
        aspectRatio?: number | undefined;
        overlayType?: string | undefined;
        overlayIntensity?: import("../overlay").OverlayIntensityType | undefined;
        overlayColor?: string | undefined;
        customOverlayContent?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactElement<any, string | React.JSXElementConstructor<any>>[] | undefined;
        errorSource?: import("../image").ImageSourceType;
        imageId?: string | undefined;
        useBackgroundContainer?: boolean | undefined;
        width?: string | number | undefined;
        height?: string | number | undefined;
        source: import("../image").ImageSourceType;
    } & AnimatedImageProps> | undefined;
    /**
     * Image style object used to pass additional style props
     * by components which render image
     */
    imageStyle?: ImageStyle | undefined;
    /**
     * Listener-callback for when an image's (uri) loading
     * starts (equiv. to Image.onLoadStart()).
     */
    onImageLoadStart?: (() => void) | undefined;
    /**
     * Listener-callback for when an image's (uri) loading
     * either succeeds or fails (equiv. to Image.onLoadEnd()).
     */
    onImageLoadEnd?: (() => void) | undefined;
    /**
     * Listener-callback for when an image's (uri) loading
     * fails (equiv. to Image.onError()).
     */
    onImageLoadError?: ((error: import("react-native").NativeSyntheticEvent<import("react-native").ImageErrorEventData>) => void) | undefined;
    /**
     * The name of the avatar user.
     * If no label is provided, the initials will be generated from the name.
     * autoColorsConfig will use the name to create the background color of the Avatar.
     */
    name?: string | undefined;
    /**
     * Hash the name (or label) to get a color, so each name will have a specific color.
     * Default is false.
     */
    useAutoColors?: boolean | undefined;
    /**
     * Send this to use the name to infer a backgroundColor
     */
    autoColorsConfig?: AutoColorsProps | undefined;
    /**
     * Label that can represent initials
     */
    label?: string | undefined;
    /**
     * The label color
     */
    labelColor?: string | undefined;
    labelEllipsizeMode?: "middle" | "head" | "tail" | "clip" | undefined;
    /**
     * ribbon label to display on the avatar
     */
    ribbonLabel?: string | undefined;
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
    customRibbon?: JSX.Element | undefined;
    /**
     * Custom size for the Avatar
     */
    size?: number | undefined;
    /**
     * Press handler
     */
    onPress?: ((props: any) => void) | undefined;
    /**
     * Used as a testing identifier
     */
    testID?: string | undefined;
} & {
    children?: React.ReactNode;
} & React.RefAttributes<any>> & Statics;
export default _default;
