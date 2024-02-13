import React, {PropsWithChildren, createContext, useEffect, useMemo} from 'react';
import {SharedValue, useSharedValue} from 'react-native-reanimated';
import type {ColorFormats} from 'tinycolor2';

type HSL = ColorFormats.HSL;


const ColorPickerContext = createContext({});

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

  const providerValue = useMemo(() => {
    return {
      value: colorValue
    };
  }, [colorValue]);

  return (<ColorPickerContext.Provider value={providerValue}>{children}</ColorPickerContext.Provider>);
};
