import React, {useEffect, useMemo} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {LinearGradientPackage as LinearGradient} from 'optionalDeps';
import View from '../view';
import {Colors} from '../../style';
import Constants from '../../commons/Constants';
import {interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';

const ANIMATION_DURATION = 1000;

export interface ShimmerPlaceholderProps {
  /**
   * The height of the skeleton view
   */
  height?: number;
  /**
   * The width of the skeleton view
   */
  width?: number;
  /**
   * The colors of the skeleton view, the array length has to be 3
   * default: [Colors.grey70, Colors.grey60, Colors.grey70]
   */
  colors?: string[];
  /**
   * Additional style to the skeleton view
   */
  shimmerStyle?: StyleProp<ViewStyle>;
  /**
   * Override container styles
   */
  style?: StyleProp<ViewStyle>;
}

const ShimmerPlaceholder = (props: ShimmerPlaceholderProps) => {
  const {
    height,
    width = 100,
    colors = [Colors.$backgroundNeutral, Colors.$backgroundNeutralMedium, Colors.$backgroundNeutral],
    shimmerStyle,
    style
  } = props;

  const translateValue = useSharedValue(-0.7);

  useEffect(() => {
    translateValue.value = withRepeat(withTiming(0.7, {duration: ANIMATION_DURATION}), -1, false);
  }, [translateValue]);

  const backgroundColor = useMemo(() => {
    return colors[0];
  }, [colors]);

  const colorList = useMemo(() => {
    return [
      {offset: '20%', color: colors[0], opacity: '1'},
      {offset: '40%', color: colors[1], opacity: '1'},
      {offset: '100%', color: colors[2], opacity: '1'}
    ];
  }, [colors]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(translateValue.value, [-1, 1], [-width, width], 'extend');
    return {transform: [{translateX}]};
  }, [width]);

  const _style = useMemo(() => {
    const reverseStyle = Constants.isRTL ? {transform: [{scaleX: -1}]} : undefined;
    return [style, shimmerStyle, {overflow: 'hidden'}, reverseStyle, {backgroundColor}];
  }, [style, shimmerStyle, backgroundColor]);

  return (
    <View
      height={height}
      width={width}
      // @ts-expect-error
      style={_style}
    >
      <View width={width} reanimated style={animatedStyle}>
        <LinearGradient colorList={colorList} angle={0}/>
      </View>
    </View>
  );
};

export default ShimmerPlaceholder;
