import _ from 'lodash';
import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {Colors} from '../../style';
import {useThemeProps} from '../../hooks';
import GradientSlider from './GradientSlider';
import SliderGroup from './context/SliderGroup';
import ColorSlider from './ColorSlider';
import {ColorSliderGroupProps, HSLA} from './types';

/**
 * @description: A Gradient Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SliderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ColorSliderGroup/ColorSliderGroup.gif?raw=true
 */
const ColorSliderGroup = <T extends string | HSLA = string>(props: ColorSliderGroupProps<T>) => {
  const themeProps = useThemeProps(props, 'ColorSliderGroup');
  const {initialColor, containerStyle, onValueChange, ...others} = themeProps;
  const _initialColor = useMemo<HSLA>(() => {
    return _.isString(initialColor) ? Colors.getHSL(initialColor) : initialColor;
  }, [initialColor]);
  const [color, setColor] = useState<HSLA>(_initialColor);

  useEffect(() => {
    setColor(_initialColor);
  }, [_initialColor]);

  const _onValueChange = useCallback((value: HSLA) => {
    const _value = _.isString(initialColor) ? Colors.getHexString(value) : value;
    onValueChange?.(_value as T);
  }, [onValueChange, initialColor]);

  return (
    <SliderGroup style={containerStyle} color={color} onValueChange={_onValueChange}>
      <ColorSlider type={GradientSlider.types.HUE} initialColor={_initialColor} {...others}/>
      <ColorSlider type={GradientSlider.types.SATURATION} initialColor={_initialColor} {...others}/>
      <ColorSlider type={GradientSlider.types.LIGHTNESS} initialColor={_initialColor} {...others}/>
    </SliderGroup>
  );
};

ColorSliderGroup.displayName = 'ColorSliderGroup';
export default ColorSliderGroup;
