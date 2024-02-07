import _ from 'lodash';
import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {asBaseComponent} from '../../commons/new';
import {Colors} from '../../style';
import GradientSlider from './GradientSlider';
import SliderGroup from './context/SliderGroup';
import ColorSlider from './ColorSlider';
import {ColorSliderGroupProps, HSLA} from './types';

/**
 * @description: A Gradient Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SliderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ColorSliderGroup/ColorSliderGroup.gif?raw=true
 */
const GenericColorSliderGroup = <T extends string | HSLA = string>(props: ColorSliderGroupProps<T>) => {
  const {initialColor, containerStyle, onValueChange, ...others} = props;
  const _initialColor = useMemo(() => {
    return _.isString(initialColor) ? Colors.HSLA(initialColor) : initialColor;
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

const ColorSliderGroup = <T extends string | HSLA = string>(props: ColorSliderGroupProps<T>) => {
  const BaseComponent = asBaseComponent<ColorSliderGroupProps<T>, typeof GenericColorSliderGroup>(GenericColorSliderGroup);
  return <BaseComponent {...props}/>;
};
ColorSliderGroup.displayName = 'ColorSliderGroup';
export default ColorSliderGroup;
