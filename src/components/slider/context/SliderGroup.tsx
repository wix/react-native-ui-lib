import React, {useCallback, useMemo, useState} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Colors} from '../../../style';
import SliderContext from './SliderContext';
import View from '../../view';
import tinycolor from 'tinycolor2';

interface SliderGroupProps {
  color: string;
  onValueChange: (color: string) => void;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const SliderGroup = (props: SliderGroupProps) => {
  const {color, onValueChange, children} = props;
  const [value, setValue] = useState(Colors.getHSL(color));

  const valueSetter = useCallback((value: tinycolor.ColorFormats.HSLA) => {
    setValue(value);
    onValueChange?.(Colors.getHexString(value));
  },
  [onValueChange]);

  const providerValue = useMemo(() => ({value, setValue: valueSetter}), [value, valueSetter]);

  return (
    <View {...props}>
      <SliderContext.Provider value={providerValue}>{children}</SliderContext.Provider>
    </View>
  );
};

SliderGroup.displayName = 'IGNORE';
export default SliderGroup;
