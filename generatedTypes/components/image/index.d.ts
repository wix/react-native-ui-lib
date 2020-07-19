import React, { PureComponent } from 'react';
import { ImageProps as RNImageProps, ImageSourcePropType } from 'react-native';
import { ForwardRefInjectedProps, BaseComponentInjectedProps, MarginModifiers } from '../../commons/new';
import { OverlayTypeType } from '../overlay';
export declare type ImageProps = RNImageProps & MarginModifiers & {
    /**
     * custom source transform handler for manipulating the image source (great for size control)
     */
    sourceTransformer?: (props: any) => ImageSourcePropType;
    /**
     * if provided image source will be driven from asset name
     */
    assetName?: string;
    /**
     * the asset group, default is "icons"
     */
    assetGroup?: string;
    /**
     * the asset tint
     */
    tintColor?: string;
    /**
     * whether the image should flip horizontally on RTL locals
     */
    supportRTL?: boolean;
    /**
     * Show image as a cover, full width, image (according to aspect ratio, default: 16:8)
     */
    cover?: boolean;
    /**
     * The aspect ratio for the image
     */
    aspectRatio?: number;
    /**
     * The type of overly to place on top of the image. Note: the image MUST have proper size, see examples in:
     * https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/OverlaysScreen.js
     */
    overlayType?: OverlayTypeType;
    /**
     * Pass a custom color for the overlay
     */
    overlayColor?: string;
    /**
     * Render an overlay with custom content
     */
    customOverlayContent?: JSX.Element;
};
declare type Props = ImageProps & ForwardRefInjectedProps & BaseComponentInjectedProps;
/**
 * @description: Image wrapper with extra functionality like source transform and assets support
 * @extends: Image
 * @extendslink: https://facebook.github.io/react-native/docs/image.html
 */
declare class Image extends PureComponent<Props> {
    static displayName: string;
    static defaultProps: {
        assetGroup: string;
    };
    static overlayTypes: {
        VERTICAL: string;
        TOP: string;
        BOTTOM: string;
        SOLID: string;
    };
    sourceTransformer?: (props: any) => ImageSourcePropType;
    constructor(props: Props);
    isGif(): boolean | undefined;
    shouldUseImageBackground(): boolean;
    getImageSource(): any;
    render(): JSX.Element;
}
export { Image };
declare const _default: React.ComponentClass<RNImageProps & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
    /**
     * custom source transform handler for manipulating the image source (great for size control)
     */
    sourceTransformer?: ((props: any) => ImageSourcePropType) | undefined;
    /**
     * if provided image source will be driven from asset name
     */
    assetName?: string | undefined;
    /**
     * the asset group, default is "icons"
     */
    assetGroup?: string | undefined;
    /**
     * the asset tint
     */
    tintColor?: string | undefined;
    /**
     * whether the image should flip horizontally on RTL locals
     */
    supportRTL?: boolean | undefined;
    /**
     * Show image as a cover, full width, image (according to aspect ratio, default: 16:8)
     */
    cover?: boolean | undefined;
    /**
     * The aspect ratio for the image
     */
    aspectRatio?: number | undefined;
    /**
     * The type of overly to place on top of the image. Note: the image MUST have proper size, see examples in:
     * https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/OverlaysScreen.js
     */
    overlayType?: string | undefined;
    /**
     * Pass a custom color for the overlay
     */
    overlayColor?: string | undefined;
    /**
     * Render an overlay with custom content
     */
    customOverlayContent?: JSX.Element | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
