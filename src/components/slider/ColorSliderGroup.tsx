import _ from 'lodash';
import React, {useState, useEffect} from 'react';
import {StyleProp, ViewStyle, TextStyle} from 'react-native';
import {asBaseComponent} from '../../commons/new';
import GradientSlider, {GradientSliderTypes} from './GradientSlider';
import SliderGroup from './context/SliderGroup';
import Text from '../text';

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

type ColorSliderProps = Pick<
  ColorSliderGroupProps,
  'sliderContainerStyle' | 'showLabels' | 'labelsStyle' | 'accessible' | 'labels' | 'migrate' | 'initialColor'
> & {
  type: GradientSliderTypes;
};

const ColorSlider = (props: ColorSliderProps) => {
  const {type, sliderContainerStyle, showLabels, labelsStyle, accessible, labels, migrate, initialColor} = props;
  return (
    <>
      {showLabels && labels && (
        <Text recorderTag={'unmask'} $textNeutral text80 style={labelsStyle} accessible={accessible}>
          {labels[type]}
        </Text>
      )}
      <GradientSlider
        color={initialColor}
        type={type}
        containerStyle={sliderContainerStyle}
        accessible={accessible}
        migrate={migrate}
      />
    </>
  );
};

/**
 * @description: A Gradient Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SliderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ColorSliderGroup/ColorSliderGroup.gif?raw=true
 */
const ColorSliderGroup = (props: ColorSliderGroupProps) => {
  const {
    labels = {hue: 'Hue', lightness: 'Lightness', saturation: 'Saturation', default: ''},
    initialColor,
    containerStyle,
    showLabels,
    labelsStyle,
    accessible,
    migrate,
    sliderContainerStyle
  } = props;
  const [color, setColor] = useState(initialColor);
  useEffect(() => {
    setColor(initialColor);
  }, [initialColor]);

  const onValueChange = (value: string) => {
    _.invoke(props, 'onValueChange', value);
  };

  const sliderProps = {
    initialColor,
    sliderContainerStyle,
    showLabels,
    labelsStyle,
    accessible,
    labels,
    migrate
  };

  return (
    <SliderGroup style={containerStyle} color={color} onValueChange={onValueChange}>
      <ColorSlider type={GradientSlider.types.HUE} {...sliderProps}/>
      <ColorSlider type={GradientSlider.types.LIGHTNESS} {...sliderProps}/>
      <ColorSlider type={GradientSlider.types.SATURATION} {...sliderProps}/>
    </SliderGroup>
  );
};

ColorSliderGroup.displayName = 'ColorSliderGroup';
export default asBaseComponent<ColorSliderGroupProps, typeof ColorSliderGroup>(ColorSliderGroup);
