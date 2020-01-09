
import {ReactElement} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native'
import {BaseComponent, PureBaseComponent} from '../commons';
import {ColorValue} from '../style/colors';

export type SliderOnValueChange = (value: number) => void;

export interface ColorSliderGroupProps {
  initialColor: ColorValue;
  onValueChange?: SliderOnValueChange;
  containerStyle?: StyleProp<ViewStyle>;
  sliderContainerStyle?: StyleProp<ViewStyle>;
  showLabels?: boolean;
  labelsStyle?: StyleProp<TextStyle>;
}

export class ColorSliderGroup extends PureBaseComponent<ColorSliderGroupProps> {}

export interface SliderProps {
  value?: number;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  minimumTrackTintColor?: ColorValue;
  maximumTrackTintColor?: ColorValue;
  renderTrack?: () => ReactElement | ReactElement[];
  thumbTintColor?: ColorValue;
  onValueChange?: SliderOnValueChange;
  containerStyle?: StyleProp<ViewStyle>;
  trackStyle?: StyleProp<ViewStyle>;
  thumbStyle?: StyleProp<ViewStyle>;
  activeThumbStyle?: StyleProp<ViewStyle>;
  disableActiveStyling?: boolean;
  disabled?: boolean;
}

export class Slider extends PureBaseComponent<SliderProps> {}

export type GradientSliderType = 'default' | 'hue' | 'lightness' | 'saturation';

export interface GradientSliderProps {
  color?: ColorValue;
  type?: GradientSliderType;
  gradientSteps?: number;
  onValueChange?: SliderOnValueChange;
}

export class GradientSlider extends BaseComponent<GradientSliderProps> {}
