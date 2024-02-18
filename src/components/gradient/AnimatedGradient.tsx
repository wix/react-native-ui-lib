import React, {useMemo} from 'react';
import {GradientTypes} from './index';
import View from '../view';
import Constants from '../../commons/Constants';
import Colors from '../../style/colors';
import Animated, {SharedValue, useAnimatedStyle, isSharedValue} from 'react-native-reanimated';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import tinycolor from 'tinycolor2';

const toHSLStringWorklet = (hsla: tinycolor.ColorFormats.HSLA | tinycolor.ColorFormats.HSL) => {
  'worklet';
  if ('a' in hsla) {
    return `hsla(${hsla.h}, ${Math.round(hsla.s * 100)}%, ${Math.round(hsla.l * 100)}%, ${hsla.a})`;
  }
  return `hsl(${hsla.h}, ${Math.round(hsla.s * 100)}%, ${Math.round(hsla.l * 100)}%)`;
};

interface GradientStepProps {
  color?: SharedValue<tinycolor.ColorFormats.HSLA>;
  index: number;
  type?: GradientTypes | `${GradientTypes}`;
  numberOfSteps: number;
}

const AnimatedGradientStep = (props: GradientStepProps) => {
  const {color = tinycolor(Colors.white).toHsl(), type, index, numberOfSteps} = props;
  const maximum = type === GradientTypes.HUE ? 359 : 1;
  const i = (index * maximum) / numberOfSteps;

  const animatedStepStyle = useAnimatedStyle(() => {
    const hslColor = isSharedValue<tinycolor.ColorFormats.HSLA>(color) ? color.value : color;
    let backgroundColor;
    switch (type) {
      case GradientTypes.HUE:
        backgroundColor = toHSLStringWorklet({s: 1, l: 0.5, h: i});
        break;
      case GradientTypes.LIGHTNESS:
        backgroundColor = toHSLStringWorklet({...hslColor, l: i});
        break;
      case GradientTypes.SATURATION:
        backgroundColor = toHSLStringWorklet({...hslColor, s: i});
        break;
      default:
        backgroundColor = toHSLStringWorklet({...hslColor, a: i});
    }
    return {
      backgroundColor
    };
  });
  return <Animated.View key={i} style={[animatedStepStyle, styles.row]}/>;
};

export interface GradientProps {
  color?: SharedValue<tinycolor.ColorFormats.HSLA>;
  type?: GradientTypes | `${GradientTypes}`;
  numberOfSteps: number;
  style?: StyleProp<ViewStyle>;
}

const Gradient = (props: GradientProps) => {
  const {color, type, numberOfSteps, style} = props;
  const rows = [...Array(numberOfSteps).keys()].map(index => {
    return (
      <AnimatedGradientStep color={color} type={type} index={index} numberOfSteps={numberOfSteps} key={index}/>
    );
  });
  const containerStyle = useMemo(() => {
    return [styles.container, style];
  }, [style]);

  return <View style={containerStyle}>{rows}</View>;
};

Gradient.types = GradientTypes;

export default Gradient;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    marginLeft: Constants.isIOS ? -StyleSheet.hairlineWidth : 0
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
  }
});
