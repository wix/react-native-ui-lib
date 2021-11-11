import React, { PureComponent } from 'react';
import { ImageProps as RNImageProps, ImageSourcePropType, NativeSyntheticEvent, ImageErrorEventData } from 'react-native';
import { ForwardRefInjectedProps, BaseComponentInjectedProps, MarginModifiers } from '../../commons/new';
import { OverlayTypeType, OverlayIntensityType } from '../overlay';
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
     * https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/OverlaysScreen.tsx
     */
    overlayType?: OverlayTypeType;
    /**
     * The intensity of the overlay ('LOW' | 'MEDIUM' | 'HIGH'), default is 'LOW'.
     */
    overlayIntensity?: OverlayIntensityType;
    /**
     * Pass a custom color for the overlay
     */
    overlayColor?: string;
    /**
     * Render an overlay with custom content
     */
    customOverlayContent?: JSX.Element;
    /**
     * Default image source in case of an error
     */
    errorSource?: ImageSourcePropType;
};
declare type Props = ImageProps & ForwardRefInjectedProps & BaseComponentInjectedProps;
declare type State = {
    error: boolean;
    prevSource: ImageSourcePropType;
};
/**
 * @description: Image wrapper with extra functionality like source transform and assets support
 * @extends: Image
 * @extendsLink: https://reactnative.dev/docs/image
 * @notes: please note that for SVG support you need to add both
 * `react-native-svg` and `react-native-svg-transformer`,
 * and also configure them (see `metro.config.js`)
 */
declare class Image extends PureComponent<Props, State> {
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
    static overlayIntensityType: typeof OverlayIntensityType;
    sourceTransformer?: (props: any) => ImageSourcePropType;
    constructor(props: Props);
    static getDerivedStateFromProps(nextProps: Partial<Props>, prevState: State): {
        error: boolean;
        prevSource: ImageSourcePropType | undefined;
    } | null;
    isGif(): boolean | undefined;
    shouldUseImageBackground(): boolean;
    getVerifiedSource(source?: ImageSourcePropType): any;
    getImageSource(): any;
    onError: (event: NativeSyntheticEvent<ImageErrorEventData>) => void;
    renderSvg: () => JSX.Element;
    renderErrorImage: () => JSX.Element;
    renderImage: (useImageInsideContainer: boolean) => JSX.Element;
    renderRegularImage(): JSX.Element;
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
     * https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/OverlaysScreen.tsx
     */
    overlayType?: string | undefined;
    /**
     * The intensity of the overlay ('LOW' | 'MEDIUM' | 'HIGH'), default is 'LOW'.
     */
    overlayIntensity?: OverlayIntensityType | undefined;
    /**
     * Pass a custom color for the overlay
     */
    overlayColor?: string | undefined;
    /**
     * Render an overlay with custom content
     */
    customOverlayContent?: JSX.Element | undefined;
    /**
     * Default image source in case of an error
     */
    errorSource?: ImageSourcePropType | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}, any> & typeof Image;
export default _default;
