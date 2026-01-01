import tinycolor from 'tinycolor2';
import {ReactElement} from 'react';
import {StyleProp, ViewStyle, TextStyle} from 'react-native';
import {ThumbProps} from './Thumb';

export type HSLA = tinycolor.ColorFormats.HSLA;

export type SliderOnValueChange = (value: number) => void;
export type SliderOnRangeChange = (values: {min: number; max: number}) => void;

export type SliderProps = Omit<ThumbProps, 'ref'> & {
  /**
   * Initial value
   */
  value?: number;
  /**
   * Track minimum value
   */
  minimumValue?: number;
  /**
   * Track maximum value
   */
  maximumValue?: number;
  /**
   * Initial minimum value (when useRange is true)
   */
  initialMinimumValue?: number;
  /**
   * Initial maximum value (when useRange is true)
   */
  initialMaximumValue?: number;
  /**
   * Step value of the slider. The value should be between 0 and (maximumValue - minimumValue)
   */
  step?: number;
  /**
   * The color used for the track from minimum value to current value
   */
  minimumTrackTintColor?: string;
  /**
   * The track color
   */
  maximumTrackTintColor?: string;
  /**
   * Custom render instead of rendering the track
   */
  renderTrack?: () => ReactElement<any> | ReactElement<any>[];
  /**
   * Callback for onValueChange
   */
  onValueChange?: SliderOnValueChange;
  /**
   * Callback that notifies about slider seeking is started
   */
  onSeekStart?: () => void;
  /**
   * Callback that notifies about slider seeking is finished
   */
  onSeekEnd?: () => void;
  /**
   * Callback that notifies when the reset function was invoked
   */
  onReset?: () => void;
  /**
   * The container style
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * The track style
   */
  trackStyle?: StyleProp<ViewStyle>;
  /**
   * If true the Slider will be disabled and will appear in disabled color
   */
  disabled?: boolean;
  /**
   * If true the Slider will display a second thumb for the min value
   */
  useRange?: boolean;
  /**
   * If true the min and max thumbs will not overlap
   */
  useGap?: boolean;
  /**
   * Callback for onRangeChange. Returns values object with the min and max values
   */
  onRangeChange?: SliderOnRangeChange;
  /**
   * If true the Slider will stay in LTR mode even if the app is on RTL mode
   */
  disableRTL?: boolean;
  /**
   * If true the component will have accessibility features enabled
   */
  accessible?: boolean;
  /**
   * The slider's test identifier
   */
  testID?: string;
  /**
   * Whether to use the new Slider implementation using Reanimated
   */
  migrate?: boolean;
   /**
   * Whether the thumb will have a shadow. default is true. (only when migrate = true)
   */
  enableThumbShadow?: boolean;
   /**
    * Disabled thumb tint color (only when migrate = true)
    */
  disabledThumbTintColor?: string;
   /** 
    * Control the throttle time of the onValueChange and onRangeChange callbacks (only when migrate = true)
    */
  throttleTime?: number;
};

export enum GradientSliderTypes {
  DEFAULT = 'default',
  HUE = 'hue',
  LIGHTNESS = 'lightness',
  SATURATION = 'saturation'
}

export type GradientSliderProps<T> = Omit<SliderProps, 'onValueChange'> & {
  /**
   * The gradient color
   */
  color?: T;
  /**
   * The gradient type (default, hue, lightness, saturation)
   */
  type?: GradientSliderTypes | `${GradientSliderTypes}`;
  /**
   * The gradient steps
   */
  gradientSteps?: number;
  /**
   * Callback for onValueChange, returns the updated color
   */
  onValueChange?: (value: string, alfa: number) => void;
  /**
   * If true the component will have accessibility features enabled
   */
  accessible?: boolean;
  /**
   * The container style
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * If true the Slider will be disabled and will appear in disabled color
   */
  disabled?: boolean;
}

export type ColorSliderGroupProps<T> = {
  /**
   * The gradient color
   */
  initialColor: T;
  /**
   * Callback for onValueChange returns the new hex color
   */
  onValueChange?: (value: T) => void;
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
  /**
   * Pass props to the sliders
   */
  sliderProps?: Omit<
    SliderProps,
    | 'migrate'
    | 'containerStyle'
    | 'accessible'
    | 'onReset'
    | 'renderTrack'
    | 'step'
    | 'maximumValue'
    | 'value'
    | 'onValueChange'
    | 'disabled'
    | 'useRange'
  >;
};
