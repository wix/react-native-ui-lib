import React from 'react';
import {LinearGradientPackage} from 'optionalDeps';
const LinearGradient = LinearGradientPackage?.default;
import {BorderGradientProps} from './types';
import View from '../../components/view';
import Spacings from '../../style/spacings';
import Colors from '../../style/colors';
import useAngleTransform from './useAngleTransform';

const BorderGradient = (props: BorderGradientProps) => {
  const {colors, borderWidth = Spacings.s1, borderRadius, children, width, height, angle, ...others} = props;

  const innerWidth = width ? width - borderWidth * 2 : undefined;
  const innerHeight = height ? height - borderWidth * 2 : undefined;
  const {start, end} = useAngleTransform({angle});

  if (!LinearGradient) {
    return null;
  }

  return (
    <View width={width} height={height}>
      <LinearGradient colors={colors} start={start} end={end} style={{borderRadius}}>
        <View
          bg-white
          width={innerWidth}
          height={innerHeight}
          style={{margin: borderWidth, borderRadius, borderWidth: 0, borderColor: Colors.transparent}}
          {...others}
        >
          {children}
        </View>
      </LinearGradient>
    </View>
  );
};

export default BorderGradient;
