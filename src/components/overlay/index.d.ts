import React, { PureComponent } from 'react';
import { ImageProps, ImageSourcePropType } from 'react-native';
declare const OVERLY_TYPES: {
    VERTICAL: string;
    TOP: string;
    BOTTOM: string;
    SOLID: string;
};
export declare enum OverlayIntensityType {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}
export type OverlayTypeType = (typeof OVERLY_TYPES)[keyof typeof OVERLY_TYPES];
export type OverlayTypes = Pick<ImageProps, 'borderRadius'> & {
    /**
     * The type of overlay to set on top of the image
     */
    type?: OverlayTypeType;
    /**
     * The intensity of the gradient, default is 'LOW'.
     */
    intensity?: OverlayIntensityType | `${OverlayIntensityType}`;
    /**
     * The overlay color
     */
    color?: string;
    /**
     * Custom overlay content to be rendered on top of the image
     */
    customContent?: React.ReactElement | React.ReactElement[];
};
/**
 * @description: Overlay view with types (default, top, bottom, solid)
 * @extends: Image
 * @extendsLink: https://reactnative.dev/docs/image
 */
declare class Overlay extends PureComponent<OverlayTypes> {
    static displayName: string;
    static overlayTypes: {
        VERTICAL: string;
        TOP: string;
        BOTTOM: string;
        SOLID: string;
    };
    static intensityTypes: typeof OverlayIntensityType;
    getStyleByType(type?: string | undefined): ("" | {
        bottom: undefined;
        height: "75%";
    } | {
        tintColor: string;
    } | undefined)[] | ("" | {
        top: undefined;
        transform: {
            scaleY: number;
        }[];
        height: "75%";
    } | {
        tintColor: string;
    } | undefined)[] | {
        backgroundColor: string | undefined;
    } | undefined;
    renderCustomContent: () => React.JSX.Element;
    renderImage: (style: any, source: ImageSourcePropType) => React.JSX.Element;
    getImageSource: (type?: OverlayTypeType, intensity?: OverlayTypes['intensity']) => any;
    render(): React.JSX.Element;
}
export default Overlay;
