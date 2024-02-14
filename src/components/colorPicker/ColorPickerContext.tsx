import React, {PropsWithChildren, createContext, useCallback, useEffect, useMemo} from 'react';
import {SharedValue, useSharedValue} from 'react-native-reanimated';
import type {ColorFormats} from 'tinycolor2';
import Slider from '../slider';
import GradientSlider, {GradientSliderTypes} from '../slider/GradientSlider';

type HSL = ColorFormats.HSL;
type SharedColorContextType = {
  value: SharedValue<HSL>;
  reset: () => void;
}

export const ColorPickerContext = createContext<SharedColorContextType>({} as SharedColorContextType);

interface ColorPickerContextProviderProps<T> extends PropsWithChildren {
  initialValue?: T;
}

const DEFAULT_VALUE = {h: 0, s: 0, l: 0};

const ColorPickerContextProvider = (props: ColorPickerContextProviderProps<HSL>) => {
  const {initialValue, children} = props;
  const colorValue = useSharedValue<HSL>(initialValue ?? DEFAULT_VALUE);

  useEffect(() => {
    colorValue.value = initialValue ?? DEFAULT_VALUE;
  }, [colorValue, initialValue]);

  const reset = useCallback(() => {
    colorValue.value = DEFAULT_VALUE;
  }, [colorValue]);

  const providerValue = useMemo(() => {
    return {
      value: colorValue,
      reset
    };
  }, [colorValue, reset]);

  return <ColorPickerContext.Provider value={providerValue}>{children}</ColorPickerContext.Provider>;
};

const MyComponent = () => {
  return (
    <ColorPickerContextProvider>
      <GradientSlider type={GradientSlider.types.HUE}/>
    </ColorPickerContextProvider>
  );
};

export default MyComponent;
