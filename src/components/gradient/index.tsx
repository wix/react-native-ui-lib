import isString from 'lodash/isString';
import tinycolor from 'tinycolor2';
import React, {useCallback, useMemo} from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import Constants from '../../commons/Constants';
import {Colors} from '../../style';
import View from '../view';

export enum GradientTypes {
  HUE = 'hue',
  LIGHTNESS = 'lightness',
  SATURATION = 'saturation'
}

export interface GradientProps {
  color?: string | tinycolor.ColorFormats.HSLA;
  type?: GradientTypes;
  numberOfSteps: number;
  style?: StyleProp<ViewStyle>;
}

const Gradient = (props: GradientProps) => {
  const {color = Colors.white, type, style, numberOfSteps} = props;

  const getBackgroundColor = useCallback((index: number) => {
    const hslColor = isString(color) ? Colors.getHSL(color) : color;
    const maximum = (type === GradientTypes.HUE) ? 359 : 1;
    const i = index * maximum / numberOfSteps;

    switch (type) {
      case GradientTypes.HUE: 
        return tinycolor({s: 1, l: 0.5, h: i}).toHslString();
      case GradientTypes.LIGHTNESS:
        return tinycolor({...hslColor, l: i}).toHslString();
      case GradientTypes.SATURATION:
        return tinycolor({...hslColor, s: i}).toHslString();
      default:
        return tinycolor({...hslColor, a: i}).toHslString();
    }
  }, [color, numberOfSteps, type]);

  const getStyle = useCallback((index: number) => {
    return {
      flex: 1,
      marginLeft: Constants.isIOS ? -StyleSheet.hairlineWidth : 0,
      backgroundColor: getBackgroundColor(index)
    };
  }, [getBackgroundColor]);
  
  const rows = useMemo(() => {
    const array = [];
    for (let i = 0; i <= numberOfSteps; i++) {
      array.push(<View key={i} style={getStyle(i)}/>);
    }
    return array;
  }, [numberOfSteps, getStyle]);

  const containerStyle = useMemo(() => {
    return [styles.container, style];
  }, [style]);

  return <View style={containerStyle}>{rows}</View>;
};

export default Gradient;
Gradient.types = GradientTypes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
  }
});
