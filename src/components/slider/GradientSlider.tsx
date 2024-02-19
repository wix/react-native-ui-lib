import _ from 'lodash';
import React, {useCallback, useEffect, useState, useMemo, useContext} from 'react';
import {asBaseComponent, forwardRef, ForwardRefInjectedProps} from '../../commons/new';
import {ComponentStatics} from '../../typings/common';
import {Colors} from '../../style';
import {Slider as NewSlider} from '../../incubator';
import Gradient from '../gradient';
import AnimatedGradient from '../gradient/AnimatedGradient';
import {GradientSliderProps, GradientSliderTypes, HSLA} from './types';
import Slider from './index';
import {ColorPickerContext} from '../colorPicker/context/ColorPickerContext';
import {isSharedValue, useDerivedValue} from 'react-native-reanimated';
import tinycolor from 'tinycolor2';

type GradientSliderComponentProps<T> = GradientSliderProps<T>;

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

  let colorPickerContext = useContext(ColorPickerContext);
  //TODO: Remove after migration is done.
  if (!migrate) {
    colorPickerContext = null;
  }
  
  useEffect(() => {
    setColor(initialColor);
  }, [initialColor]);

  const animatedHueColor = useDerivedValue(() => {
    if (colorPickerContext) {
      return {
        h: colorPickerContext.value.value.h,
        s: 1,
        l: 0.5,
        a: 1
      };
    }
    return {};
  });
  const hueColor = useMemo(() => {
    return {
      h: color.h,
      s: 1,
      l: 0.5,
      a: 1
    };
  }, [color]);

  const renderDefaultGradient = useCallback(() => {
    if (colorPickerContext) {
      const {value} = colorPickerContext;
      return <AnimatedGradient color={value} numberOfSteps={gradientSteps}/>;
    }
    return <Gradient color={color} numberOfSteps={gradientSteps}/>;
  }, [gradientSteps, colorPickerContext, color]);

  const renderHueGradient = useCallback(() => {
    return <Gradient type={Gradient.types.HUE} numberOfSteps={gradientSteps}/>;
  }, [gradientSteps]);

  const renderLightnessGradient = useCallback(() => {
    if (colorPickerContext && isSharedValue<tinycolor.ColorFormats.HSLA>(animatedHueColor)) {
      return (
        <AnimatedGradient type={Gradient.types.LIGHTNESS} color={animatedHueColor} numberOfSteps={gradientSteps}/>
      );
    }
    return <Gradient type={Gradient.types.LIGHTNESS} color={hueColor} numberOfSteps={gradientSteps}/>;
  }, [hueColor, gradientSteps, animatedHueColor, colorPickerContext]);

  const renderSaturationGradient = useCallback(() => {
    if (colorPickerContext && isSharedValue<tinycolor.ColorFormats.HSLA>(animatedHueColor)) {
      return (
        <AnimatedGradient type={Gradient.types.SATURATION} color={animatedHueColor} numberOfSteps={gradientSteps}/>
      );
    }
    return <Gradient type={Gradient.types.SATURATION} color={hueColor} numberOfSteps={gradientSteps}/>;
  }, [hueColor, gradientSteps, animatedHueColor, colorPickerContext]);

  const onValueChange = useCallback((value: string, alpha: number) => {
    // alpha returns for type.DEFAULT
    _onValueChange?.(value, alpha);
  },
  [_onValueChange]);

  const updateColor = useCallback((color: HSLA) => {
    setColor(color);
    const hex = Colors.getHexString(color);
    onValueChange(hex, color.a);
  },
  [onValueChange]);

  const reset = useCallback(() => {
    updateColor(initialColor);
  }, [initialColor, updateColor]);

  const updateAlpha = useCallback((a: number) => {
    updateColor({...color, a});
  },
  [updateColor, color]);

  const updateHue = useCallback((h: number) => {
    updateColor({...color, h});
  },
  [color, updateColor]);

  const updateLightness = useCallback((l: number) => {
    updateColor({...color, l});
  },
  [color, updateColor]);

  const updateSaturation = useCallback((s: number) => {
    updateColor({...color, s});
  },
  [color, updateColor]);

  let step = 0.01;
  let maximumValue = 1;
  let value = colorPickerContext ? colorPickerContext.value.value.a : color.a;
  let renderTrack = renderDefaultGradient;
  let sliderOnValueChange = colorPickerContext ? colorPickerContext.updateAlpha : updateAlpha;

  switch (type) {
    case GradientSliderTypes.HUE:
      step = 1;
      maximumValue = 359;
      value = colorPickerContext ? colorPickerContext.value.value.h : initialColor.h;
      renderTrack = renderHueGradient;
      sliderOnValueChange = colorPickerContext ? colorPickerContext.updateHue : updateHue;
      break;
    case GradientSliderTypes.LIGHTNESS:
      value = colorPickerContext ? colorPickerContext.value.value.l : initialColor.l;
      renderTrack = renderLightnessGradient;
      sliderOnValueChange = colorPickerContext ? colorPickerContext.updateLightness : updateLightness;
      break;
    case GradientSliderTypes.SATURATION:
      value = colorPickerContext ? colorPickerContext.value.value.s : initialColor.s;
      renderTrack = renderSaturationGradient;
      sliderOnValueChange = colorPickerContext ? colorPickerContext.updateSaturation : updateSaturation;
      break;
    default:
      break;
  }
  const SliderComponent = migrate ? NewSlider : Slider;

  return (
    <SliderComponent
      {...others}
      ref={forwardedRef}
      onReset={colorPickerContext ? colorPickerContext.reset : reset}
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
      useWorkletHandlers={!!colorPickerContext}
    />
  );
};

GradientSlider.displayName = 'GradientSlider';
GradientSlider.types = GradientSliderTypes;
// @ts-expect-error
export default asBaseComponent<GradientSliderProps, ComponentStatics<typeof GradientSlider>>(forwardRef(GradientSlider));
