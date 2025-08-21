import React from 'react';
import {LinearGradientPackage} from 'optionalDeps';
const LinearGradient = LinearGradientPackage?.default;
import {CircleGradientProps} from './types';
import View from '../../components/view';
import useAngleTransform from './useAngleTransform';

const CircleGradient = (props: CircleGradientProps) => {
  const {colors, radius, angle, children, ...others} = props;

  const internalDiameter = radius ? radius * 2 : undefined;
  const {start, end} = useAngleTransform({angle});

  return (
    <View width={internalDiameter} height={internalDiameter} style={{borderRadius: 999, overflow: 'hidden'}}>
      <LinearGradient colors={colors} start={start} end={end}>
        <View width={internalDiameter} height={internalDiameter} {...others}>
          {children}
        </View>
      </LinearGradient>
    </View>
  );
};

export default CircleGradient;
