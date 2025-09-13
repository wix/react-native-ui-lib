import React from 'react';
import { LinearGradientPackage } from "../../optionalDependencies";
const LinearGradient = LinearGradientPackage?.default;
import View from "../../components/view";
import useAngleTransform from "./useAngleTransform";
const RectangleGradient = props => {
  const {
    colors,
    width,
    height,
    angle,
    children,
    ...others
  } = props;
  const {
    start,
    end
  } = useAngleTransform({
    angle
  });
  if (!LinearGradient) {
    return null;
  }
  return <View width={width} height={height}>
      <LinearGradient colors={colors} start={start} end={end}>
        <View width={width} height={height} {...others}>
          {children}
        </View>
      </LinearGradient>
    </View>;
};
export default RectangleGradient;