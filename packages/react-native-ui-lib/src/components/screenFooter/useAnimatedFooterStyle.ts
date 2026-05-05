import {useAnimatedKeyboard, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import {AnimatedFooterStyleProps, ScreenFooterProps} from './types';
import {Constants} from '../../commons/new';
import {useEffect, useMemo, useState} from 'react';

const androidVersion = Constants.getAndroidVersion();
const useAnimatedFooterStyle = (
  props: AnimatedFooterStyleProps & Pick<ScreenFooterProps, 'keyboardBehavior' | 'visible' | 'isAndroidEdgeToEdge'>
) => {
  const {
    animationDuration = 200,
    keyboardBehavior,
    visible,
    isAndroidEdgeToEdge = !!androidVersion && androidVersion >= 35 ? true : undefined
  } = props;

  const keyboard = useAnimatedKeyboard({
    isNavigationBarTranslucentAndroid: isAndroidEdgeToEdge,
    isStatusBarTranslucentAndroid: isAndroidEdgeToEdge
  });
  const [height, setHeight] = useState(0);

  const visibilityTranslateY = useSharedValue(0);

  useEffect(() => {
    visibilityTranslateY.value = withTiming(visible ? 0 : height, {duration: animationDuration});
  }, [visible, height, animationDuration, visibilityTranslateY]);

  const animatedStyle = useAnimatedStyle(() => {
    if (keyboardBehavior === 'hoisted') {
      return {
        transform: [{translateY: visibilityTranslateY.value}]
      };
    } else {
      const counterSystemOffset = Constants.isAndroid ? keyboard.height.value : 0;
      return {
        transform: [{translateY: counterSystemOffset + visibilityTranslateY.value}]
      };
    }
  });

  const containerStyle = useMemo(() => {
    return [styles.container, animatedStyle];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyboardBehavior]);

  return {containerStyle, setHeight};
};

export default useAnimatedFooterStyle;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
});
