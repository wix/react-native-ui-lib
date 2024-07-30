import _ from 'lodash';
import React, {useCallback, useMemo, useContext} from 'react';
import {forwardRef, ForwardRefInjectedProps} from '../../commons/new';
import {ComponentStatics} from '../../typings/common';
import {useThemeProps} from '../../hooks';
import {Colors} from '../../style';
import {Slider as NewSlider} from '../../incubator';
import Gradient from '../gradient';
import {GradientSliderProps, GradientSliderTypes, HSLA} from './types';
import Slider from './index';
import SliderContext from './SliderContext';

type Props<T> = GradientSliderProps<T> & ForwardRefInjectedProps;

/**
 * @description: A Gradient Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SliderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/GradientSlider/GradientSlider.gif?raw=true
 */
const GradientSlider = <T extends string | HSLA = string>(props: Props<T>) => {
  const themeProps = useThemeProps(props, 'GradientSlider');
  const {
    type = GradientSliderTypes.DEFAULT,
    gradientSteps = 120,
    color,
    onValueChange,
    migrate,
    containerStyle,
    disabled,
    accessible,
    forwardedRef,
    ...others
  } = themeProps;
  const sliderContext = useContext(SliderContext);
  const defaultColor = Colors.getHSL(Colors.$backgroundPrimaryHeavy);

  const initialColor = useMemo((): HSLA | undefined => {
    return _.isString(color) ? Colors.getHSL(color) : color;
  }, [color]);

  const getColor = useCallback(() => {
    return initialColor || sliderContext.value || defaultColor;
  }, [initialColor, sliderContext.value, defaultColor]);

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

  const updateColor = useCallback((color: HSLA) => {
    if (!_.isEmpty(sliderContext)) {
      sliderContext.setValue?.(color);
    } else {
      const hex = Colors.getHexString(color); // alpha returns for type.DEFAULT
      onValueChange?.(hex, color.a);
    }
  },
  [sliderContext, onValueChange]);

  const reset = useCallback(() => {
    updateColor(initialColor || defaultColor);
  }, [initialColor, updateColor, defaultColor]);

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
  const initialValue = useMemo(() => getColor(), []);
  let value = initialValue.a;
  let renderTrack = renderDefaultGradient;
  let sliderOnValueChange = updateAlpha;

  switch (type) {
    case GradientSliderTypes.HUE:
      step = 1;
      maximumValue = 359;
      value = initialValue.h;
      renderTrack = renderHueGradient;
      sliderOnValueChange = updateHue;
      break;
    case GradientSliderTypes.LIGHTNESS:
      value = initialValue.l;
      renderTrack = renderLightnessGradient;
      sliderOnValueChange = updateLightness;
      break;
    case GradientSliderTypes.SATURATION:
      value = initialValue.s;
      renderTrack = renderSaturationGradient;
      sliderOnValueChange = updateSaturation;
      break;
    default:
      break;
  }
  const SliderComponent = migrate ? NewSlider : Slider;

  return (
    <SliderComponent
      thumbTintColor={Colors.getHexString(hueColor)}
      {...others}
      ref={forwardedRef}
      onReset={reset}
      renderTrack={renderTrack}
      step={step}
      maximumValue={maximumValue}
      value={value}
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
export default forwardRef<GradientSliderProps<string | HSLA>, ComponentStatics<typeof GradientSlider>>(GradientSlider);
