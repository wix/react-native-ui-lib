import {useAnimatedKeyboard, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {StyleSheet, ViewStyle} from 'react-native';
import {AnimatedFooterStyleProps, ScreenFooterProps} from './types';
import {Constants} from '../../commons/new';
import {useEffect, useMemo, useState} from 'react';

const androidVersion = Constants.getAndroidVersion();
const useAnimatedFooterStyle = (
  props: AnimatedFooterStyleProps &
    Pick<ScreenFooterProps, 'keyboardBehavior' | 'visible' | 'isAndroidEdgeToEdge' | 'containerStyle'>
) => {
  const {
    animationType: animationTypeProp = 'slide',
    animationDuration: animationDurationProp = 200,
    keyboardBehavior,
    visible,
    isAndroidEdgeToEdge = !!androidVersion && androidVersion >= 35 ? true : undefined,
    containerStyle: containerStyleOverride
  } = props;

  const animationType = animationDurationProp === 0 ? 'none' : animationTypeProp;
  const animationDuration = animationType === 'none' ? 0 : animationDurationProp;

  const keyboard = useAnimatedKeyboard({
    isNavigationBarTranslucentAndroid: isAndroidEdgeToEdge,
    isStatusBarTranslucentAndroid: isAndroidEdgeToEdge
  });

  const [height, setHeight] = useState(0);
  const animatedValue = useSharedValue(animationType === 'fade' && visible ? 1 : 0);

  useEffect(() => {
    if (animationType === 'slide') {
      animatedValue.value = withTiming(visible ? 0 : height, {duration: animationDuration});
    } else {
      animatedValue.value = withTiming(visible ? 1 : 0, {duration: animationDuration});
    }
  }, [visible, height, animationDuration, animatedValue, animationType]);

  const animatedStyle = useAnimatedStyle(() => {
    let style: ViewStyle = {};
    let translateY = 0;
    if (animationType === 'slide') {
      translateY = animatedValue.value;
    } else if (animationType === 'fade') {
      style = {opacity: animatedValue.value};
    }

    if (keyboardBehavior === 'sticky' && Constants.isAndroid) {
      translateY += keyboard.height.value;
    }

    if (animationType === 'slide' || translateY !== 0) {
      style.transform = [{translateY}];
    }

    return style;
  });

  const containerStyle = useMemo(() => {
    return [styles.container, animatedStyle, containerStyleOverride];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerStyleOverride]);

  return {containerStyle, setHeight};
};

export default useAnimatedFooterStyle;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 50
  }
});
