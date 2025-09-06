import React, { PureComponent } from 'react';
import { Image as RNImage, ImageProps as RNImageProps, ImageBackgroundProps, NativeSyntheticEvent, ImageErrorEventData } from 'react-native';
import { ForwardRefInjectedProps, BaseComponentInjectedProps, MarginModifiers } from '../../commons/new';
import { ComponentStatics } from '../../typings/common';
import { RecorderProps } from '../../typings/recorderTypes';
import { OverlayTypeType, OverlayIntensityType } from '../overlay';
export type ImageSourceType = string | RNImageProps['source'];
export type ImageProps = Omit<RNImageProps, 'source'> & Pick<ImageBackgroundProps, 'imageStyle'> & MarginModifiers & RecorderProps & {
    /**
     * custom source transform handler for manipulating the image source (great for size control)
     */
    sourceTransformer?: (props: any) => ImageSourceType;
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
    customOverlayContent?: React.ReactElement | React.ReactElement[];
    /**
     * Default image source in case of an error
     */
    errorSource?: ImageSourceType;
    /**
     * An imageId that can be used in sourceTransformer logic
     */
    imageId?: string;
    /**
     * Use a container for the Image, this can solve issues on
     * Android when animation needs to be performed on the same
     * view; i.e. animation related crashes on Android.
     */
    useBackgroundContainer?: boolean;
    /**
     * The image width
     */
    width?: string | number;
    /**
     * The image height
     */
    height?: string | number;
    source: ImageSourceType;
};
type Props = ImageProps & ForwardRefInjectedProps & BaseComponentInjectedProps;
type State = {
    error: boolean;
    prevSource: ImageSourceType;
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
    sourceTransformer?: (props: any) => ImageSourceType;
    constructor(props: Props);
    static getDerivedStateFromProps(nextProps: Partial<Props>, prevState: State): {
        error: boolean;
        prevSource: ImageSourceType;
    } | null;
    isGif(): boolean | undefined;
    shouldUseImageBackground(): boolean;
    getVerifiedSource(source?: ImageSourceType): any;
    getImageSource(): any;
    getImageStyle: () => import("react-native").StyleProp<import("react-native").ImageStyle>;
    onError: (event: NativeSyntheticEvent<ImageErrorEventData>) => void;
    renderSvg: () => React.JSX.Element;
    renderImageWithContainer: () => React.JSX.Element;
    renderImage: (useImageInsideContainer: boolean) => React.JSX.Element;
    renderRegularImage(): React.JSX.Element;
    render(): React.JSX.Element;
}
export { Image };
declare const _default: React.ForwardRefExoticComponent<Omit<RNImageProps, "source"> & Pick<ImageBackgroundProps, "imageStyle"> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & RecorderProps & {
    /**
     * custom source transform handler for manipulating the image source (great for size control)
     */
    sourceTransformer?: ((props: any) => ImageSourceType) | undefined;
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
    customOverlayContent?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactElement<any, string | React.JSXElementConstructor<any>>[] | undefined;
    /**
     * Default image source in case of an error
     */
    errorSource?: ImageSourceType;
    /**
     * An imageId that can be used in sourceTransformer logic
     */
    imageId?: string | undefined;
    /**
     * Use a container for the Image, this can solve issues on
     * Android when animation needs to be performed on the same
     * view; i.e. animation related crashes on Android.
     */
    useBackgroundContainer?: boolean | undefined;
    /**
     * The image width
     */
    width?: string | number | undefined;
    /**
     * The image height
     */
    height?: string | number | undefined;
    source: ImageSourceType;
} & React.RefAttributes<any>> & ComponentStatics<typeof Image & typeof RNImage>;
export default _default;
