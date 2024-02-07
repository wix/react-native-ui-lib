import React, {useState, useEffect, useCallback} from 'react';
import {asBaseComponent} from '../../commons/new';
import GradientSlider from './GradientSlider';
import SliderGroup from './context/SliderGroup';
import ColorSlider from './ColorSlider';
import {ColorSliderGroupProps} from './types';

/**
 * @description: A Gradient Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SliderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ColorSliderGroup/ColorSliderGroup.gif?raw=true
 */
const ColorSliderGroup = (props: ColorSliderGroupProps) => {
  const {initialColor, containerStyle, ...others} = props;
  const [color, setColor] = useState(initialColor);
  useEffect(() => {
    setColor(initialColor);
  }, [initialColor]);

  const onValueChange = useCallback((value: string) => {
    props?.onValueChange?.(value);
  },
  [props]);

  return (
    <SliderGroup style={containerStyle} color={color} onValueChange={onValueChange}>
      <ColorSlider type={GradientSlider.types.HUE} initialColor={initialColor} {...others}/>
      <ColorSlider type={GradientSlider.types.SATURATION} initialColor={initialColor} {...others}/>
      <ColorSlider type={GradientSlider.types.LIGHTNESS} initialColor={initialColor} {...others}/>
    </SliderGroup>
  );
};

ColorSliderGroup.displayName = 'ColorSliderGroup';
export default asBaseComponent<ColorSliderGroupProps, typeof ColorSliderGroup>(ColorSliderGroup);
