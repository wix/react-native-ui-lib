import React, {useState, useEffect, useCallback} from 'react';
import {StyleProp, ViewStyle, TextStyle} from 'react-native';
import {asBaseComponent} from '../../commons/new';
import GradientSlider, {GradientSliderTypes} from './GradientSlider';
import SliderGroup from './context/SliderGroup';
import ColorSlider from './ColorSlider';

type SliderOnValueChange = (value: string) => void;

export type ColorSliderGroupProps = {
  /**
   * The gradient color
   */
  initialColor: string;
  /**
   * Callback for onValueChange returns the new hex color
   */
  onValueChange?: SliderOnValueChange;
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
