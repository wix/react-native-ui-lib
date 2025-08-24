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
      LogService.error(`RNUILib Gradient requires installing "react-native-linear-gradient" dependency`);
    }
  }, []);

  switch (type) {
    case 'rectangle':
      return <RectangleGradient {...(others as RectangleGradientProps)}/>;
    case 'circle':
      return <CircleGradient {...(others as CircleGradientProps)}/>;
    case 'border':
      return <BorderGradient {...(others as BorderGradientProps)}/>;
    default:
      return null;
  }
};

export default Gradient;
