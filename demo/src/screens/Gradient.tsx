import React, {useMemo} from 'react';
import {GradientTypes, View, Constants, Text} from 'react-native-ui-lib';
import Animated, {SharedValue, useAnimatedStyle} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import tinycolor from 'tinycolor2';

const toHSLStringWorklet = (hsla: tinycolor.ColorFormats.HSLA | tinycolor.ColorFormats.HSL) => {
  'worklet';
  if ('a' in hsla) {
    return `hsla(${hsla.h}, ${Math.round(hsla.s * 100)}%, ${Math.round(hsla.l * 100)}%, ${hsla.a})`;
  }
  return `hsl(${hsla.h}, ${Math.round(hsla.s * 100)}%, ${Math.round(hsla.l * 100)}%)`;
};


interface GradientStepProps {
  color: SharedValue<tinycolor.ColorFormats.HSLA>;
  index: number;
  type?: GradientTypes | `${GradientTypes}`;
  numberOfSteps: number;
}

const AnimatedGradientStep = (props: GradientStepProps) => {
  const {color, type, index, numberOfSteps} = props;
  const maximum = type === GradientTypes.HUE ? 359 : 1;
  const i = (index * maximum) / numberOfSteps;

  const animatedStepStyle = useAnimatedStyle(() => {
    const hslColor = color.value;
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
    // console.log(`Nitzan - backgroundColor`, backgroundColor);
    return {
      backgroundColor
    };
  });
  return <Animated.View key={i} style={[animatedStepStyle, styles.row]}/>;
};

export interface GradientProps {
  color: SharedValue<tinycolor.ColorFormats.HSLA>;
  type?: GradientTypes | `${GradientTypes}`;
  numberOfSteps: number;
}

const Gradient = (props: GradientProps) => {
  const {color, type, numberOfSteps} = props;
  const rows = [...Array(numberOfSteps).keys()].map(index => {
    return (
      // <Text key={index}>Hello</Text>
      <AnimatedGradientStep color={color} type={type} index={index} numberOfSteps={numberOfSteps} key={index}/>
    );
  });
  return <View style={[styles.container]}>{rows}</View>;
};

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
