import React, { PureComponent } from 'react';
import { ImageSourcePropType, StyleProp, ViewStyle, ImagePropsBase, ImageStyle, TextStyle, AccessibilityProps } from 'react-native';
import { BadgeProps } from '../badge';
import { ImageProps } from '../image';
export declare enum StatusModes {
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE",
    AWAY = "AWAY",
    NONE = "NONE"
}
export declare enum BadgePosition {
    TOP_RIGHT = "TOP_RIGHT",
    TOP_LEFT = "TOP_LEFT",
    BOTTOM_RIGHT = "BOTTOM_RIGHT",
    BOTTOM_LEFT = "BOTTOM_LEFT"
}
export declare type AvatarProps = Pick<AccessibilityProps, 'accessibilityLabel'> & {
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
    badgeProps?: BadgeProps;
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
    size: number;
    /**
     * Press handler
     */
    onPress?: (props: any) => void;
    /**
     * Used as a testing identifier
     */
    testID?: string;
};
export declare type AvatarPropTypes = AvatarProps;
/**
 * @description: Avatar component for displaying user profile images
 * @extends: TouchableOpacity
 * @extendsnotes: (when passing onPress)
 * @extendslink: docs/TouchableOpacity
 * @image: https://user-images.githubusercontent.com/33805983/34480603-197d7f64-efb6-11e7-9feb-db8ba756f055.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/AvatarsScreen.tsx
 */
declare class Avatar extends PureComponent<AvatarProps> {
    styles: ReturnType<typeof createStyles>;
    constructor(props: AvatarProps);
    static displayName: string;
    static modes: typeof StatusModes;
    static badgePosition: typeof BadgePosition;
    static defaultProps: {
        animate: boolean;
        backgroundColor: string;
        size: number;
        labelColor: string;
        badgePosition: BadgePosition;
    };
    getContainerStyle(): StyleProp<ViewStyle>;
    getInitialsContainer(): StyleProp<ViewStyle>;
    getRibbonStyle(): StyleProp<ViewStyle>;
    getStatusBadgeColor(status: StatusModes | undefined): string | null;
    getBadgeBorderWidth: () => any;
    getBadgeColor(): any;
    getBadgeSize: () => number;
    getBadgePosition: () => object;
    renderBadge(): JSX.Element | undefined;
    renderRibbon(): JSX.Element | undefined;
    renderImage(): JSX.Element | undefined;
    render(): JSX.Element;
}
declare function createStyles(props: AvatarProps): {
    initialsContainerWithInset: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    initials: {
        color: string | undefined;
        backgroundColor: string;
        lineHeight: undefined;
    };
    ribbon: {
        backgroundColor: string;
        paddingHorizontal: number;
        paddingVertical: number;
    };
};
export { Avatar };
declare const _default: React.ComponentClass<Pick<AccessibilityProps, "accessibilityLabel"> & {
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
    badgePosition?: BadgePosition | undefined;
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
    source?: number | import("react-native").ImageURISource | import("react-native").ImageURISource[] | undefined;
    /**
     * Image props object
     */
    imageProps?: ImageProps | undefined;
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
     * Label that can represent initials
     */
    label?: string | undefined;
    /**
     * The label color
     */
    labelColor?: string | undefined;
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
     * Determine if to show online badge
     */
    isOnline?: boolean | undefined;
    /**
     * AWAY, ONLINE, OFFLINE or NONE mode (if set to a value other then 'NONE' will override isOnline prop)
     */
    status?: StatusModes | undefined;
    /**
     * Custom size for the Avatar
     */
    size: number;
    /**
     * Press handler
     */
    onPress?: ((props: any) => void) | undefined;
    /**
     * Used as a testing identifier
     */
    testID?: string | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}, any> & typeof Avatar;
export default _default;
