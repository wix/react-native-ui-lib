import _ from 'lodash';
import React, {useState, useCallback, useMemo, useEffect, useRef} from 'react';
import {Colors} from '../../style';
import {useThemeProps} from '../../hooks';
import View from '../view';
import Text from '../text';
import {ColorSliderGroupProps, HSLA, GradientSliderTypes} from './types';
import SliderContext from './SliderContext';
import GradientSlider from './GradientSlider';
import Slider from '../slider';
import {Slider as NewSlider} from '../../incubator';
import Gradient, {GradientTypes} from '../gradient';
import {useAnimatedReaction, useSharedValue, useWorkletCallback} from 'react-native-reanimated';

/**
 * @description: A Gradient Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SliderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ColorSliderGroup/ColorSliderGroup.gif?raw=true
 */
const ColorSliderGroup = <T extends string | HSLA = string>(props: ColorSliderGroupProps<T>) => {
  const themeProps = useThemeProps(props, 'ColorSliderGroup');
  const {
    initialColor: initialColorProp,
    onValueChange,
    containerStyle,
    sliderContainerStyle,
    showLabels = true,
    labels = {hue: 'Hue', lightness: 'Lightness', saturation: 'Saturation', default: ''},
    labelsStyle,
    accessible,
    migrate
  } = themeProps;

  const previousInitialColor = useRef(initialColorProp);
  const value = useSharedValue<HSLA>(typeof initialColorProp === 'string' ? Colors.getHSL(initialColorProp) : initialColorProp);

  useAnimatedReaction(() => value.value, (previousValue, newValue) => {
    if (newValue && previousValue !== newValue) {
      onValueChange?.(newValue as T);
    }
  });

  if (previousInitialColor.current !== initialColorProp) {
    value.value = typeof initialColorProp === 'string' ? Colors.getHSL(initialColorProp) : initialColorProp;
    previousInitialColor.current = initialColorProp;
  }

  const onChangeHue = useWorkletCallback((_value: number) => {
    value.value.h = _value;
  }, []);
  const onChangeSaturation = useWorkletCallback((_value: number) => {
    value.value.s = _value;
  }, []);
  const onChangeLightness = useWorkletCallback((_value: number) => {
    value.value.l = _value;
  }, []);


  const createTypeMapping = <H, S, L>(hValue: H, sValue: S, lValue: L) => {
    return {
      [GradientTypes.HUE]: hValue,
      [GradientTypes.SATURATION]: sValue,
      [GradientTypes.LIGHTNESS]: lValue
    };
  };

  const getHandlerByType = (type: GradientTypes) => {
    return createTypeMapping(onChangeHue, onChangeSaturation, onChangeLightness)[type];
  };

  const getRangeByType = (type: GradientTypes) => {
    return createTypeMapping([0, 360], [0, 1], [0, 1])[type];
  };
  const getValueByType = (type: GradientTypes) => {
    return createTypeMapping(value.value.h, value.value.s, value.value.l)[type];
  };
  
  const hueColor = {
    h: Colors.getHSL(Colors.$backgroundInverted).h,
    s: 1,
    l: 0.5,
    a: 1
  };

  const renderHueTrack = useCallback(() => {
    return <Gradient type={GradientTypes.HUE} numberOfSteps={360}/>;
  }, []);
  const renderSaturationTrack = useCallback(() => {
    return <Gradient type={GradientTypes.SATURATION} color={hueColor} numberOfSteps={120}/>;
  }, []);
  const renderLightnessTrack = useCallback(() => {
    return <Gradient type={GradientTypes.LIGHTNESS} color={hueColor} numberOfSteps={120}/>;
  }, []);

  const getTrackRendererByType = (type: GradientTypes) => {
    return createTypeMapping(renderHueTrack, renderSaturationTrack, renderLightnessTrack)[type];
  };


  const renderSlider = (type: GradientTypes) => {
    const [minRange, maxRange] = getRangeByType(type);
    return (
      <>
        {showLabels && labels && (
          <Text recorderTag={'unmask'} $textNeutral text80 style={labelsStyle} accessible={accessible}>
            {labels[type]}
          </Text>
        )}
        <NewSlider
          renderTrack={getTrackRendererByType(type)}
          value={getValueByType(type)}
          accessible={accessible}
          containerStyle={sliderContainerStyle}
          onValueChange={getHandlerByType(type)}
          minimumValue={minRange}
          maximumValue={maxRange}
        />
      </>
    );
  };

  return (
    <View style={containerStyle}>
      {renderSlider(GradientTypes.HUE)}
      {renderSlider(GradientTypes.SATURATION)}
      {renderSlider(GradientTypes.LIGHTNESS)}
    </View>
  );
};

ColorSliderGroup.displayName = 'ColorSliderGroup';
export default ColorSliderGroup;
