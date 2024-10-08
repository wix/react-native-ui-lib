import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import AnimatedImage, {AnimatedImageProps} from '../animatedImage';
import {Colors} from '../../style';

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

class ProgressiveImage extends React.Component<ProgressiveImageProps, {}> {
  static displayName = 'ProgressiveImage';

  thumbnailAnimated = new Animated.Value(0);
  imageAnimated = new Animated.Value(0);

  getThumbnail = () => {
    const {thumbnailSource, ...props} = this.props;

    return <AnimatedImage {...props} source={thumbnailSource} loader={<View style={styles.container}/>}/>;
  };

  render() {
    //@ts-ignore
    return <AnimatedImage {...this.props} loader={this.getThumbnail()}/>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey60
  }
});

export default ProgressiveImage;
