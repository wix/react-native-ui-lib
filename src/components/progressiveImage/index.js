import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {AnimatedImage, Colors} from 'react-native-ui-lib'; //eslint-disable-line

/**
 * @description: Image component that loads first a small thumbnail of the images, 
 *               and fades-in the full-sized image with animation once it's loaded
 * @extends: Animated.Image 
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ProgressiveImageScreen.js
 */
class ProgressiveImage extends React.Component {
  thumbnailAnimated = new Animated.Value(0);
  imageAnimated = new Animated.Value(0);

  handleThumbnailLoad = () => {
    Animated.timing(this.thumbnailAnimated, {
      toValue: 1
    }).start();
  }

  onImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1
    }).start();
  }

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

    // return (
    //   <View style={styles.container}>
    //     <Animated.Image
    //       {...props}
    //       source={thumbnailSource}
    //       style={[style, { opacity: this.thumbnailAnimated }]}
    //       onLoad={this.handleThumbnailLoad}
    //       blurRadius={1}
    //     />
    //     <Animated.Image
    //       {...props}
    //       source={source}
    //       style={[styles.imageOverlay, { opacity: this.imageAnimated }, style]}
    //       onLoad={this.onImageLoad}
    //     />
    //   </View>
    // );
  }
}

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  },
  container: {
    backgroundColor: '#e1e4e8'
  }
});


export default ProgressiveImage;
