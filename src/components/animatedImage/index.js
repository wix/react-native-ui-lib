// TODO: consider unify this component functionality with our Image component
import React, { useState, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import View from "../../components/view";
import Image from "../../components/image";
import { useDidUpdate } from "../../hooks";
const UIAnimatedImage = Animated.createAnimatedComponent(Image);
/**
 * @description: Image component that fades-in the image with animation once it's loaded
 * @extends: Animated.Image
 * @gif: https://media.giphy.com/media/l0HU7jj0ivEFyZIA0/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/AnimatedImageScreen.js
 */
const AnimatedImage = props => {
  const {
    containerStyle,
    source,
    loader,
    style,
    onLoad: propsOnLoad,
    onLoadStart: propsOnLoadStart,
    animationDuration = 300,
    testID,
    ...others
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const opacity = useSharedValue(0);
  useDidUpdate(() => {
    if (!loader) {
      opacity.value = 1;
    }
  }, [loader]);
  const onLoad = useCallback(event => {
    setIsLoading(false);
    propsOnLoad?.(event);
    // did not start the animation already
    if (opacity.value === 0) {
      opacity.value = withTiming(1, {
        duration: animationDuration
      });
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [setIsLoading, propsOnLoad, animationDuration]);
  const onLoadStart = useCallback(() => {
    setIsLoading(true);
    propsOnLoadStart?.();
  }, [setIsLoading, propsOnLoadStart, animationDuration]);
  const fadeInStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    };
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const _style = useMemo(() => [style, fadeInStyle], [style]);
  return <View style={containerStyle}>
      <UIAnimatedImage {...others} style={_style} source={source} onLoad={onLoad} onLoadStart={onLoadStart} testID={testID} imageStyle={undefined} />
      {isLoading && loader && <View style={styles.loader}>{loader}</View>}
    </View>;
};
AnimatedImage.displayName = 'AnimatedImage';
export default AnimatedImage;
const styles = StyleSheet.create({
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center'
  }
});