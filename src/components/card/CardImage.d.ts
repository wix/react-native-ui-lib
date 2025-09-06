import React from 'react';
import { ImageProps } from '../image';
export type CardImageProps = ImageProps & {
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
};
declare const _default: React.ComponentType<CardImageProps>;
export default _default;
