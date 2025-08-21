import React, {useEffect} from 'react';
import {LinearGradientPackage} from 'optionalDeps';
const LinearGradient = LinearGradientPackage?.default;
import {LogService} from 'services';
import {GradientProps, RectangleGradientProps, CircleGradientProps, BorderGradientProps} from './types';
import RectangleGradient from './RectangleGradient';
import CircleGradient from './CircleGradient';
import BorderGradient from './BorderGradient';

export {GradientProps};

const Gradient = (props: GradientProps) => {
  const {type = 'rectangle', ...others} = props;

  useEffect(() => {
    if (LinearGradient === undefined) {
      LogService.error(`RNUILib SkeletonView's requires installing "react-native-linear-gradient" dependency`);
    }
  }, []);

  if (!LinearGradient) {
    return null;
  }

  if (type === 'rectangle') {
    return <RectangleGradient {...(others as RectangleGradientProps)}/>;
  }

  if (type === 'circle') {
    return <CircleGradient {...(others as CircleGradientProps)}/>;
  }

  if (type === 'border') {
    return <BorderGradient {...(others as BorderGradientProps)}/>;
  }
};

export default Gradient;
