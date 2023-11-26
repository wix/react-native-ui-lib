import _ from 'lodash';
import tinycolor from 'tinycolor2';
import React, {Component, useEffect, useRef, useState} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Colors} from '../../style';
import {asBaseComponent, forwardRef, ForwardRefInjectedProps} from '../../commons/new';
import Slider, {SliderProps} from './index';
import {Slider as NewSlider} from '../../incubator';
import {SliderContextProps} from './context/SliderContext';
import asSliderGroupChild from './context/asSliderGroupChild';
import Gradient from '../gradient';

type SliderOnValueChange = (value: string, alfa: number) => void;

export enum GradientSliderTypes {
  DEFAULT = 'default',
  HUE = 'hue',
  LIGHTNESS = 'lightness',
  SATURATION = 'saturation'
}

export type GradientSliderProps = Omit<SliderProps, 'onValueChange'> & {
  /**
   * The gradient color
   */
  color?: string;
  /**
   * The gradient type (default, hue, lightness, saturation)
   */
  type?: GradientSliderTypes;
  /**
   * The gradient steps
   */
  gradientSteps?: number;
  /**
   * Callback for onValueChange, returns the updated color
   */
  onValueChange?: SliderOnValueChange;
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
};

type GradientSliderComponentProps = {
  /**
   * Context of the slider group
   */
  sliderContext: SliderContextProps;
} & GradientSliderProps &
  typeof defaultProps;

type Props = GradientSliderComponentProps & ForwardRefInjectedProps;

const defaultProps = {
  type: GradientSliderTypes.DEFAULT,
  gradientSteps: 120,
  color: Colors.$backgroundPrimaryHeavy
};

/**
 * @description: A Gradient Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SliderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/GradientSlider/GradientSlider.gif?raw=true
 */
const GradientSlider = (props: Props) => {
  const {
    type = GradientSliderTypes.DEFAULT,
    gradientSteps = 120,
    color: propsColors = Colors.$backgroundPrimaryHeavy,
    sliderContext,
    onValueChange: _onValueChange,
    migrate,
    containerStyle,
    disabled,
    accessible,
    ...others
  } = props;

  const [prevColor, setPrevColor] = useState(Colors.getHSL(propsColors));
  const [initialColor, setInitialColor] = useState(Colors.getHSL(propsColors));
  const [color, setColor] = useState(Colors.getHSL(propsColors));
  const slider = useRef<any>(null);

  useEffect(() => {
    setPrevColor(Colors.getHSL(propsColors)); // TODO: Why does prevColor takes the new color ????
    setColor(Colors.getHSL(propsColors));
  }, [propsColors]);

  const reset = () => {
    updateColor(initialColor);
  };

  const getColor = () => {
    return color || sliderContext.value;
  };

  const getStepColor = (i: number) => {
    const color = getColor();
    return tinycolor({...color, a: i}).toHslString();
  };

  const renderDefaultGradient = () => {
    const color = getColor();

    return <Gradient color={color} numberOfSteps={gradientSteps}/>;
  };

  const renderHueGradient = () => {
    return <Gradient type={Gradient.types.HUE} numberOfSteps={gradientSteps}/>;
  };

  const renderLightnessGradient = () => {
    const color = getColor();
    return <Gradient type={Gradient.types.LIGHTNESS} color={color} numberOfSteps={gradientSteps}/>;
  };

  const renderSaturationGradient = () => {
    const color = getColor();
    return <Gradient type={Gradient.types.SATURATION} color={color} numberOfSteps={gradientSteps}/>;
  };

  const onValueChange = (value: string, alpha: number) => {
    // alpha returns for type.DEFAULT
    _onValueChange?.(value, alpha);
  };
  const updateColor = (color: tinycolor.ColorFormats.HSLA) => {
    if (!_.isEmpty(sliderContext)) {
      sliderContext.setValue?.(color);
    } else {
      setColor(color);
      const hex = Colors.getHexString(color);
      onValueChange(hex, color.a);
    }
  };

  const updateAlpha = (a: number) => {
    const color = getColor();
    updateColor({...color, a});
  };

  const updateHue = (h: number) => {
    const color = getColor();
    updateColor({...color, h});
  };

  const updateLightness = (l: number) => {
    const color = getColor();
    updateColor({...color, l});
  };

  const updateSaturation = (s: number) => {
    const color = getColor();
    updateColor({...color, s});
  };

  const _color = getColor();
  const thumbTintColor = Colors.getHexString(color);
  let step = 0.01;
  let maximumValue = 1;
  let value = color.a;
  let renderTrack = renderDefaultGradient;
  let sliderOnValueChange = updateAlpha;

  switch (type) {
    case GradientSliderTypes.HUE:
      step = 1;
      maximumValue = 359;
      value = initialColor.h;
      renderTrack = renderHueGradient;
      sliderOnValueChange = updateHue;
      break;
    case GradientSliderTypes.LIGHTNESS:
      value = initialColor.l;
      renderTrack = renderLightnessGradient;
      sliderOnValueChange = updateLightness;
      break;
    case GradientSliderTypes.SATURATION:
      value = initialColor.s;
      renderTrack = renderSaturationGradient;
      sliderOnValueChange = updateSaturation;
      break;
    default:
      break;
  }
  const SliderComponent = migrate ? NewSlider : Slider;

  return (
    <SliderComponent
      {...others}
      //@ts-expect-error
      ref={forwardedRef}
      onReset={reset}
      renderTrack={renderTrack}
      step={step}
      maximumValue={maximumValue}
      value={value}
      thumbTintColor={thumbTintColor}
      onValueChange={sliderOnValueChange}
      containerStyle={containerStyle}
      disabled={disabled}
      accessible={accessible}
      useRange={false}
    />
  );
};

GradientSlider.displayName = 'GradientSlider';
GradientSlider.types = GradientSliderTypes;

export default asBaseComponent<GradientSliderComponentProps, typeof GradientSlider>(forwardRef(asSliderGroupChild(GradientSlider)));
