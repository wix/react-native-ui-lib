import _ from 'lodash';
import React, {useState, useEffect, useCallback} from 'react';
import {StyleProp, ViewStyle, TextStyle} from 'react-native';
import {Colors} from '../../style';
import {asBaseComponent} from '../../commons/new';
import GradientSlider, {GradientSliderTypes, HSLA} from './GradientSlider';
import SliderGroup from './context/SliderGroup';
import ColorSlider from './ColorSlider';


export type ColorSliderGroupProps = {
  /**
   * The gradient color
   */
  initialColor: string | HSLA;
  /**
   * Callback for onValueChange returns the new hex color
   */
  onValueChange?: (value: string | HSLA) => void;
  /**
   * Group container style
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Sliders style
   */
  sliderContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Show the sliders labels (defaults are: Hue, Lightness, Saturation)
   */
  showLabels?: boolean;
  /**
   * In case you would like to change the default labels (translations etc.), you can provide
   * this prop with a map to the relevant labels ({hue: ..., lightness: ..., saturation: ...}).
   */
  labels?: {[key in GradientSliderTypes]: string};
  /**
   * The labels style
   */
  labelsStyle?: StyleProp<TextStyle>;
  /**
   * If true the component will have accessibility features enabled
   */
  accessible?: boolean;
  /**
   * Whether to use the new Slider implementation using Reanimated
   */
  migrate?: boolean;
};

/**
 * @description: A Gradient Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SliderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ColorSliderGroup/ColorSliderGroup.gif?raw=true
 */
const ColorSliderGroup = (props: ColorSliderGroupProps) => {
  const {initialColor, containerStyle, ...others} = props;
  const [color, setColor] = useState(_.isString(initialColor) ? Colors.HSLA(initialColor) : initialColor);
  
  useEffect(() => {
    setColor(_.isString(initialColor) ? Colors.HSLA(initialColor) : initialColor);
  }, [initialColor]);

  const onValueChange = useCallback((value: string | HSLA) => {
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
