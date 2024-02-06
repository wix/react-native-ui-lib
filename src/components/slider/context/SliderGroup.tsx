import React, {useCallback, useMemo, useState} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import SliderContext from './SliderContext';
import type {HSLA} from '../GradientSlider';
import View from '../../view';

interface SliderGroupProps {
  color: HSLA;
  onValueChange: (color: HSLA) => void;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const SliderGroup = (props: SliderGroupProps) => {
  const {color, onValueChange, children} = props;
  const [value, setValue] = useState(color);

  const _setValue = useCallback((value: HSLA) => {
    setValue(value);
    onValueChange?.(value);
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
