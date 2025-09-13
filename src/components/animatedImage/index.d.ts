import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ImageProps } from '../../components/image';
export interface AnimatedImageProps extends ImageProps {
    /**
     * Additional spacing styles for the container
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Duration for the fade animation when the image is loaded
     */
    animationDuration?: number;
    /**
     * A component to render while the image is loading
     */
    loader?: React.ReactElement;
}
/**
 * @description: Image component that fades-in the image with animation once it's loaded
 * @extends: Animated.Image
 * @gif: https://media.giphy.com/media/l0HU7jj0ivEFyZIA0/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/AnimatedImageScreen.js
 */
declare const AnimatedImage: {
    (props: AnimatedImageProps): React.JSX.Element;
    displayName: string;
};
export default AnimatedImage;
