/// <reference types="react" />
import { ImageSourcePropType } from 'react-native';
export interface ScrollBarGradientProps {
    /**
     * Is the gradient visible
     */
    visible?: boolean;
    /**
     * Should the gradient be on the left (reverse)
     */
    left?: boolean;
    /**
     * The gradient's width (default is 76)
     */
    gradientWidth?: number;
    /**
     * The gradient's height (default 100%)
     */
    gradientHeight?: number;
    /**
     * The gradient's margins (default is 0)
     */
    gradientMargins?: number;
    /**
     * The gradient's height (default 100%)
     * @deprecated
     */
    height?: number;
    /**
     * The gradient's color (default is white)
     */
    gradientColor?: string;
    /**
     * Image source for the gradient (default is assets/gradientOverlay.png)
     */
    gradientImage?: ImageSourcePropType;
}
declare const ScrollBarGradient: {
    ({ visible, left, gradientWidth, gradientHeight, gradientMargins, height, gradientColor, gradientImage }: ScrollBarGradientProps): JSX.Element;
    displayName: string;
};
export default ScrollBarGradient;
