import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Animated} from 'react-native';
import AnimatedImage from '../animatedImage';
import {Colors} from '../../style';

/**
 * @description: Image component that loads first a small thumbnail of the images, 
 *               and fades-in the full-sized image with animation once it's loaded
 * @extends: Animated.Image 
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ProgressiveImageScreen.js
 */
class ProgressiveImage extends React.Component {
  static displayName = 'ProgressiveImage';
  static propTypes = {
    /**
     * small thumbnail source to display while the full-size image is loading
     */
    thumbnailSource: PropTypes.object
  };

  thumbnailAnimated = new Animated.Value(0);
  imageAnimated = new Animated.Value(0);

  getThumbnail = () => {
    const {thumbnailSource, ...props} = this.props;

    return (
      <AnimatedImage                
        {...props}
        source={thumbnailSource}
        loader={<View style={styles.container}/>}        
      />
    );
  }

  render() {    
    return (
      <AnimatedImage        
        {...this.props}
        loader={this.getThumbnail()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey60
  }
});


export default ProgressiveImage;
