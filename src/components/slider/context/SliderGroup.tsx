import React, {useCallback, useMemo, useState} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Colors} from '../../../style';
import SliderContext from './SliderContext';
import type {GradientSliderTypes} from '../GradientSlider';
import View from '../../view';
import tinycolor from 'tinycolor2';

interface SliderGroupProps {
  color: string;
  onValueChange: (color: string, type?: GradientSliderTypes) => void;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const SliderGroup = (props: SliderGroupProps) => {
  const {color, onValueChange, children} = props;
  const [value, setValue] = useState(Colors.getHSL(color));

  const _setValue = useCallback((value: tinycolor.ColorFormats.HSLA, type?: GradientSliderTypes) => {
    setValue(value);
    onValueChange?.(Colors.getHexString(value), type);
  },
  [onValueChange]);

  const contextProviderValue = useMemo(() => ({value, setValue: _setValue}), [value, _setValue]);

  return (
    <View {...props}>
      <SliderContext.Provider value={contextProviderValue}>{children}</SliderContext.Provider>
    </View>
  );
};

SliderGroup.displayName = 'IGNORE';
export default SliderGroup;
