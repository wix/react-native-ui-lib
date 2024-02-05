import _ from 'lodash';
import tinycolor from 'tinycolor2';
import React, {useCallback, useEffect, useState, useRef} from 'react';
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

  const initialColor = useRef(Colors.getHSL(propsColors));
  const [color, setColor] = useState(Colors.getHSL(propsColors));
  
  useEffect(() => {
    setColor(Colors.getHSL(propsColors));
  }, [propsColors]);

  const getColor = useCallback(() => {
    return color || sliderContext.value;
  }, [color, sliderContext.value]);

  const getHueColor = useCallback(() => {
    const color = getColor();
    return {
      h: color.h,
      s: 1,
      l: 0.5,
      a: 1
    };
  }, [getColor]);

  const renderDefaultGradient = useCallback(() => {
    return <Gradient color={getColor()} numberOfSteps={gradientSteps}/>;
  }, [getColor, gradientSteps]);

  const renderHueGradient = useCallback(() => {
    return <Gradient type={Gradient.types.HUE} numberOfSteps={gradientSteps}/>;
  }, [gradientSteps]);

  const renderLightnessGradient = useCallback(() => {
    return <Gradient type={Gradient.types.LIGHTNESS} color={getHueColor()} numberOfSteps={gradientSteps}/>;
  }, [getHueColor, gradientSteps]);

  const renderSaturationGradient = useCallback(() => {
    return <Gradient type={Gradient.types.SATURATION} color={getHueColor()} numberOfSteps={gradientSteps}/>;
  }, [getHueColor, gradientSteps]);

  const onValueChange = useCallback((value: string, alpha: number) => {
    // alpha returns for type.DEFAULT
    _onValueChange?.(value, alpha);
  },
  [_onValueChange]);

  const updateColor = useCallback((color: tinycolor.ColorFormats.HSLA) => {
    if (!_.isEmpty(sliderContext)) {
      sliderContext.setValue?.(color);
    } else {
      setColor(color);
      const hex = Colors.getHexString(color);
      onValueChange(hex, color.a);
    }
  },
  [sliderContext, onValueChange]);

  const reset = useCallback(() => {
    updateColor(initialColor.current);
  }, [initialColor, updateColor]);

  const updateAlpha = useCallback((a: number) => {
    const color = getColor();
    updateColor({...color, a});
  },
  [getColor, updateColor]);

  const updateHue = useCallback((h: number) => {
    const color = getColor();
    updateColor({...color, h});
  },
  [getColor, updateColor]);

  const updateLightness = useCallback((l: number) => {
    const color = getColor();
    updateColor({...color, l});
  },
  [getColor, updateColor]);

  const updateSaturation = useCallback((s: number) => {
    const color = getColor();
    updateColor({...color, s});
  },
  [getColor, updateColor]);

  let step = 0.01;
  let maximumValue = 1;
  let value = color.a;
  let renderTrack = renderDefaultGradient;
  let sliderOnValueChange = updateAlpha;

  switch (type) {
    case GradientSliderTypes.HUE:
      step = 1;
      maximumValue = 359;
      value = initialColor.current.h;
      renderTrack = renderHueGradient;
      sliderOnValueChange = updateHue;
      break;
    case GradientSliderTypes.LIGHTNESS:
      value = initialColor.current.l;
      renderTrack = renderLightnessGradient;
      sliderOnValueChange = updateLightness;
      break;
    case GradientSliderTypes.SATURATION:
      value = initialColor.current.s;
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
      thumbTintColor={Colors.getHexString(getHueColor())}
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
