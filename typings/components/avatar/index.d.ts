/// <reference types="react" />
import { BaseComponent } from "../../commons";
export declare const STATUS_MODES: {
    ONLINE: string;
    OFFLINE: string;
    AWAY: string;
    NONE: string;
};
declare type AvatarProps = {
    backgroundColor?: string;
    containerStyle?: any;
    imageSource?: object | number;
    onImageLoadStart?: (...args: any[]) => any;
    onImageLoadEnd?: (...args: any[]) => any;
    onImageLoadError?: (...args: any[]) => any;
    label?: string;
    labelColor?: string;
    ribbonLabel?: string;
    ribbonStyle?: any;
    ribbonLabelStyle?: any;
    isOnline?: boolean;
    status?: any;
    size?: number;
    testID?: string;
    onPress?: (...args: any[]) => any;
};
/**
 * @description: Avatar component for displaying user profile images
 * @extends: TouchableOpacity
 * @extendsnotes: (when passing onPress)
 * @extendslink: docs/TouchableOpacity
 * @image: https://user-images.githubusercontent.com/33805983/34480603-197d7f64-efb6-11e7-9feb-db8ba756f055.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/AvatarsScreen.js
 */
export default class Avatar extends BaseComponent<AvatarProps, {}> {
    static displayName: string;
    static modes: {
        ONLINE: string;
        OFFLINE: string;
        AWAY: string;
        NONE: string;
    };
    static defaultProps: {
        backgroundColor: any;
        size: number;
        labelColor: any;
        status: string;
    };
    generateStyles(): void;
    getStatusBadgeColor(status: any): any;
    getBadgeColor(isOnline: any, status: any): any;
    renderBadge(): false | JSX.Element;
    renderRibbon(): JSX.Element;
    renderImage(): JSX.Element;
    render(): JSX.Element;
}
export {};
