import React from 'react';
import { LinearGradientPackage } from "../../optionalDependencies";
const LinearGradient = LinearGradientPackage?.default;
import View from "../../components/view";
import useAngleTransform from "./useAngleTransform";
const CircleGradient = props => {
  const {
    colors,
    radius,
    angle,
    children,
    ...others
  } = props;
  const internalDiameter = radius ? radius * 2 : undefined;
  const {
    start,
    end
  } = useAngleTransform({
    angle
  });
  if (!LinearGradient) {
    return null;
  }
  return <View width={internalDiameter} height={internalDiameter} style={{
    borderRadius: 999,
    overflow: 'hidden'
  }}>
      <LinearGradient colors={colors} start={start} end={end}>
        <View width={internalDiameter} height={internalDiameter} {...others}>
          {children}
        </View>
      </LinearGradient>
    </View>;
};
export default CircleGradient;