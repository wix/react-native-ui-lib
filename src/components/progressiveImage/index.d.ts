import React from 'react';
import { Animated } from 'react-native';
import { AnimatedImageProps } from '../animatedImage';
/**
 * @description: Image component that loads first a small thumbnail of the images,
 *               and fades-in the full-sized image with animation once it's loaded
 * @extends: AnimatedImage
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ProgressiveImageScreen.js
 */
export type ProgressiveImageProps = {
    /**
     * small thumbnail source to display while the full-size image is loading
     */
    thumbnailSource: AnimatedImageProps['source'];
};
declare class ProgressiveImage extends React.Component<ProgressiveImageProps, {}> {
    static displayName: string;
    thumbnailAnimated: Animated.Value;
    imageAnimated: Animated.Value;
    getThumbnail: () => React.JSX.Element;
    render(): React.JSX.Element;
}
export default ProgressiveImage;
