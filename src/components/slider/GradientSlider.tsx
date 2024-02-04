import _ from 'lodash';
import tinycolor from 'tinycolor2';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Colors} from '../../style';
import {asBaseComponent, forwardRef, ForwardRefInjectedProps} from '../../commons/new';
import {ComponentStatics} from '../../typings/common';
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

export type GradientSliderProps = Omit<
  SliderProps,
  'onValueChange' | 'value' | 'minimumValue' | 'maximumValue' | 'step' | 'thumbHitSlop' | 'useGap'
> & {
  /**
   * The gradient color
   */
  color?: string;
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
} & Partial<Pick<SliderProps, 'value' | 'minimumValue' | 'maximumValue' | 'step' | 'thumbHitSlop' | 'useGap'>>; // Fixes typing errors with the old slider.

type GradientSliderComponentProps = {
  /**
   * Context of the slider group
   */
  sliderContext: SliderContextProps;
} & GradientSliderProps;

type Props = GradientSliderComponentProps & ForwardRefInjectedProps;

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
    forwardedRef,
    ...others
  } = props;

  const [initialColor] = useState(Colors.getHSL(propsColors));
  const [color, setColor] = useState(Colors.getHSL(propsColors));

  useEffect(() => {
    setColor(Colors.getHSL(propsColors));
  }, [propsColors]);

  const getColor = useCallback(() => {
    return color || sliderContext.value;
  }, [color, sliderContext.value]);

  const renderDefaultGradient = useCallback(() => {
    const color = getColor();

    return <Gradient color={color} numberOfSteps={gradientSteps}/>;
  }, [getColor, gradientSteps]);

  const renderHueGradient = useCallback(() => {
    return <Gradient type={Gradient.types.HUE} numberOfSteps={gradientSteps}/>;
  }, [gradientSteps]);

  const renderLightnessGradient = useCallback(() => {
    const color = getColor();
    return <Gradient type={Gradient.types.LIGHTNESS} color={color} numberOfSteps={gradientSteps}/>;
  }, [getColor, gradientSteps]);

  const renderSaturationGradient = useCallback(() => {
    const color = getColor();
    return <Gradient type={Gradient.types.SATURATION} color={color} numberOfSteps={gradientSteps}/>;
  }, [getColor, gradientSteps]);

  const onValueChange = useCallback((value: string, alpha: number) => {
    // alpha returns for type.DEFAULT
    _onValueChange?.(value, alpha);
  },
  [_onValueChange]);

  const updateColor = useCallback((color: tinycolor.ColorFormats.HSLA, type?: GradientSliderTypes) => {
    if (!_.isEmpty(sliderContext)) {
      sliderContext.setValue?.(color, type);
    } else {
      setColor(color);
      const hex = Colors.getHexString(color);
      onValueChange(hex, color.a);
    }
  },
  [sliderContext, onValueChange]);

  const reset = useCallback(() => {
    updateColor(initialColor);
  }, [initialColor, updateColor]);

  const updateAlpha = useCallback((a: number) => {
    const color = getColor();
    updateColor({...color, a}, GradientSliderTypes.DEFAULT);
  },
  [getColor, updateColor]);

  const updateHue = useCallback((h: number) => {
    const color = getColor();
    updateColor({...color, h}, GradientSliderTypes.HUE);
  },
  [getColor, updateColor]);

  const updateLightness = useCallback((l: number) => {
    const color = getColor();
    updateColor({...color, l}, GradientSliderTypes.LIGHTNESS);
  },
  [getColor, updateColor]);

  const updateSaturation = useCallback((s: number) => {
    const color = getColor();
    updateColor({...color, s}, GradientSliderTypes.SATURATION);
  },
  [getColor, updateColor]);

  const _color = getColor();
  const thumbTintColor = Colors.getHexString(_color);
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

// eslint-disable-next-line max-len
// @ts-expect-error
export default asBaseComponent<GradientSliderProps, ComponentStatics<typeof GradientSlider>>(forwardRef(asSliderGroupChild(forwardRef(GradientSlider))));
