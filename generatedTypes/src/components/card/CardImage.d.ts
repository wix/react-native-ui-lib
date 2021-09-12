import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { ImageProps } from '../image';
export declare type CardImageProps = Omit<ImageProps, 'source'> & {
    /**
     * Image source, either remote source or local. Note: for remote pass object {uri: <remote_uri_string>}
     */
    imageSource?: ImageSourcePropType;
    source?: ImageSourcePropType;
    /**
     * Image width
     */
    width?: number | string;
    /**
     * Image height
     */
    height?: number | string;
    /**
     * The Image position which determines the appropriate flex-ness of the image and border radius (for Android)
     * this prop derived automatically from Card parent component if it rendered as a direct child of the
     * Card component
     */
    position?: string[];
    /**
     * border radius, basically for Android since overflow doesn't work well (deprecated)
     */
    borderRadius?: number;
};
declare const _default: React.ComponentType<CardImageProps>;
export default _default;
