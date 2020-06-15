import { PureComponent } from 'react';
import { ImageSourcePropType } from 'react-native';
declare const OVERLY_TYPES: {
    VERTICAL: string;
    TOP: string;
    BOTTOM: string;
    SOLID: string;
};
export declare type OverlayTypeType = typeof OVERLY_TYPES[keyof typeof OVERLY_TYPES];
export declare type OverlayTypes = {
    /**
     * The type of overlay to set on top of the image
     */
    type?: OverlayTypeType;
    /**
     * The overlay color
     */
    color?: string;
    /**
     * Custom overlay content to be rendered on top of the image
     */
    customContent?: JSX.Element;
};
/**
 * @description: Overlay view with types (default, top, bottom, solid)
 * @extends: Image
 * @extendsLink: https://facebook.github.io/react-native/docs/image
 */
declare class Overlay extends PureComponent<OverlayTypes> {
    static displayName: string;
    static overlayTypes: {
        VERTICAL: string;
        TOP: string;
        BOTTOM: string;
        SOLID: string;
    };
    getStyleByType(type?: string | undefined): ("" | {
        backgroundColor: string;
    } | undefined)[] | ("" | {
        bottom: undefined;
        top: number;
        height: string;
    } | {
        tintColor: string;
    } | undefined)[] | ("" | {
        bottom: number;
        top: undefined;
        height: string;
        transform: {
            scaleY: number;
        }[];
    } | {
        tintColor: string;
    } | undefined)[] | undefined;
    renderCustomContent: () => JSX.Element;
    renderImage: (style: any, source: ImageSourcePropType) => JSX.Element;
    render(): JSX.Element;
}
export default Overlay;
