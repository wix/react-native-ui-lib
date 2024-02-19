import React, {PropsWithChildren, createContext, useCallback, useMemo} from 'react';
import {SharedValue, runOnJS, useAnimatedReaction, useSharedValue, useWorkletCallback} from 'react-native-reanimated';
import type {ColorFormats} from 'tinycolor2';
import {getValidColorString, hslToHex} from '../ColorPickerPresenter';

type HSLA = ColorFormats.HSLA;
export type SharedColorContextType = {
  value: SharedValue<HSLA>;
  hex: SharedValue<string | undefined>;
  isValid: SharedValue<boolean>;
  setColor: (hsla: HSLA) => void;
  updateAlpha: (a: number) => void;
  updateHue: (h: number) => void;
  updateSaturation: (s: number) => void;
  updateLightness: (l: number) => void;
  reset: () => void;
};
 
export const ColorPickerContext = createContext<SharedColorContextType | null>(null);

interface ColorPickerContextProviderProps<T> extends PropsWithChildren {
  color: T;
}

const DEFAULT_VALUE = {h: 0, s: 0, l: 0, a: 0};

export const ColorPickerContextProvider = (props: ColorPickerContextProviderProps<SharedValue<HSLA>>) => {
  const {color, children} = props;
  // const color = useSharedValue<HSLA>(initialValue ?? DEFAULT_VALUE);

  const reset = useCallback(() => {
    color.value = DEFAULT_VALUE;
  }, [color]);

  const updateAlpha = useWorkletCallback((a: number) => {
    'worklet';
    color.value = {...color.value, a};
  },
  [color]);

  const updateHue = useWorkletCallback((h: number) => {
    'worklet';
    color.value = {...color.value, h};
  },
  [color]);
  const updateLightness = useWorkletCallback((l: number) => {
    'worklet';
    color.value = {...color.value, l};
  },
  [color]);
  const updateSaturation = useWorkletCallback((s: number) => {
    'worklet';
    color.value = {...color.value, s};
  },
  [color]);

  const hex = useSharedValue<string | undefined>(undefined);
  const isValid = useSharedValue<boolean>(false);

  useAnimatedReaction(() => {
    const {h, s, l} = color.value;
    return getValidColorString(hslToHex({h, s: s * 100, l: l * 100}));
  },
  (current, prev) => {
    if (current.hex !== prev?.hex) {
      hex.value = current.hex?.toUpperCase();
    }
    if (current.valid !== prev?.valid) {
      console.log(`Nitzan - new valid`, current.valid);
      isValid.value = current.valid;
    }
  });

  const setColor = useWorkletCallback((hsla: HSLA) => {
    color.value = hsla;
  });

  const providerValue = useMemo(() => {
    return {
      value: color,
      hex,
      isValid,
      setColor,
      updateAlpha,
      updateHue,
      updateLightness,
      updateSaturation,
      reset
    };
  }, [color, reset, updateAlpha, updateHue, updateLightness, updateSaturation, hex, isValid, setColor]);
  return <ColorPickerContext.Provider value={providerValue}>{children}</ColorPickerContext.Provider>;
};
