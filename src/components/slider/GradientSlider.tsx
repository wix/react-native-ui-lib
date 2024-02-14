import _ from 'lodash';
import React, {useCallback, useEffect, useState, useMemo, useContext} from 'react';
import {asBaseComponent, forwardRef, ForwardRefInjectedProps} from '../../commons/new';
import {ComponentStatics} from '../../typings/common';
import {Colors} from '../../style';
import {Slider as NewSlider} from '../../incubator';
import Gradient from '../gradient';
import {GradientSliderProps, GradientSliderTypes, HSLA} from './types';
import Slider from './index';
import {SliderContextProps} from './context/SliderContext';
import asSliderGroupChild from './context/asSliderGroupChild';
import {ColorPickerContext} from '../colorPicker/ColorPickerContext';

type GradientSliderComponentProps<T> = {
  sliderContext: SliderContextProps;
} & GradientSliderProps<T>;

type Props<T> = GradientSliderComponentProps<T> & ForwardRefInjectedProps;

/**
 * @description: A Gradient Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SliderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/GradientSlider/GradientSlider.gif?raw=true
 */
const GradientSlider = <T extends string | HSLA = string>(props: Props<T>) => {
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

  const initialColor = useMemo((): HSLA => {
    return _.isString(propsColors) ? Colors.getHSL(propsColors) : propsColors;
  }, [propsColors]);
  const [color, setColor] = useState(initialColor);

  const colorPickerContext = useContext(ColorPickerContext);

  console.log(`Nitzan - colorPickerContext.value`, colorPickerContext.value.value.h);


  useEffect(() => {
    setColor(initialColor);
  }, [initialColor]);

  const getColor = useCallback(() => {
    return color || sliderContext.value;
  }, [color, sliderContext.value]);

  const hueColor = useMemo(() => {
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
    return <Gradient type={Gradient.types.LIGHTNESS} color={hueColor} numberOfSteps={gradientSteps}/>;
  }, [hueColor, gradientSteps]);

  const renderSaturationGradient = useCallback(() => {
    return <Gradient type={Gradient.types.SATURATION} color={hueColor} numberOfSteps={gradientSteps}/>;
  }, [hueColor, gradientSteps]);

  const onValueChange = useCallback((value: string, alpha: number) => {
    // alpha returns for type.DEFAULT
    _onValueChange?.(value, alpha);
  },
  [_onValueChange]);

  const updateColor = useCallback((color: HSLA) => {
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
    updateColor(initialColor);
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
      thumbTintColor={Colors.getHexString(hueColor)}
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
// @ts-expect-error
export default asBaseComponent<GradientSliderProps, ComponentStatics<typeof GradientSlider>>(
  // @ts-expect-error
  forwardRef(asSliderGroupChild(forwardRef(GradientSlider))));
