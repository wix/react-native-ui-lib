import React, { useEffect } from 'react';
import { LinearGradientPackage } from "../../optionalDependencies";
const LinearGradient = LinearGradientPackage?.default;
import { LogService } from "../../services";
import { GradientProps } from "./types";
import RectangleGradient from "./RectangleGradient";
import CircleGradient from "./CircleGradient";
import BorderGradient from "./BorderGradient";
export { GradientProps };
const Gradient = props => {
  const {
    type = 'rectangle',
    ...others
  } = props;
  useEffect(() => {
    if (LinearGradient === undefined) {
      LogService.error(`RNUILib Gradient requires installing "react-native-linear-gradient" dependency`);
    }
  }, []);
  switch (type) {
    case 'rectangle':
      return <RectangleGradient {...others} />;
    case 'circle':
      return <CircleGradient {...others} />;
    case 'border':
      return <BorderGradient {...others} />;
    default:
      return null;
  }
};
export default Gradient;