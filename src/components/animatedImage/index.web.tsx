import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, Animated} from 'react-native';
import View from '../../components/view';

/**
 * @description: Image component that fades-in the image with animation once it's loaded
 * @extends: Animated.Image
 */
const AnimatedImage = props => {
  const {
    containerStyle,
    source,
    loader,
    style,
    onLoad: propsOnLoad,
    animationDuration = 300,
    testID,
    ...others
  } = props;

  const [isLoading, setIsLoading] = useState(true);
  const opacity = new Animated.Value(0);

  useEffect(() => {
    // Fade in the image once it's loaded
    if (!isLoading) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true // Note: native driver may not work for opacity on the web
      }).start();
    }
  }, [isLoading, opacity, animationDuration]);

  const onLoad = useCallback(
    event => {
      setIsLoading(false);
      propsOnLoad?.(event);
    },
    [propsOnLoad]
  );

  return (
    <View style={containerStyle}>
      <Animated.Image
        {...others}
        source={source}
        style={[style, {opacity}]} // Apply the animated opacity
        onLoad={onLoad} // Handle the onLoad event
        testID={testID}
      />
      {isLoading && loader && <View style={styles.loader}>{loader}</View>}
    </View>
  );
};

AnimatedImage.displayName = 'AnimatedImage';
export default AnimatedImage;

const styles = StyleSheet.create({
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center'
  }
});
