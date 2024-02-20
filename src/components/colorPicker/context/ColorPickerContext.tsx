import React, {PropsWithChildren, createContext, useCallback, useMemo, useState} from 'react';
import {SharedValue, runOnJS, useAnimatedReaction, useSharedValue, useWorkletCallback} from 'react-native-reanimated';
import type {ColorFormats} from 'tinycolor2';
import {getValidColorString, hslToHex} from '../ColorPickerPresenter';

type HSLA = ColorFormats.HSLA;
export type SharedColorContextType = {
  value: SharedValue<HSLA>;
  hex: SharedValue<string | undefined>;
  isValid: SharedValue<boolean>;
  statefulColor: ColorFormats.HSLA;
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
  const [statefulColor, setStatefulColor] = useState(color.value);

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
    console.log(`Nitzan - h`, h);
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
    console.log(`Nitzan - changed`, h);
    console.log(`Nitzan - hslToHex({h, s: s * 100, l: l * 100})`, hslToHex({h, s: s * 100, l: l * 100}));
    return getValidColorString(hslToHex({h, s: s * 100, l: l * 100}));
  },
  (current, prev) => {
    console.log(`Nitzan - current.hex, prev?.hex`, current.hex, prev?.hex);
    if (current.hex !== prev?.hex) {
      if (current.valid) {
        console.log(`Nitzan - hex changing`, current.hex);
        hex.value = current.hex?.toUpperCase();
      }
    }
    if (current.valid !== prev?.valid) {
      isValid.value = current.valid;
    }
  });

  const setColor = useWorkletCallback((hsla: HSLA) => {
    color.value = hsla;
    runOnJS(setStatefulColor)(hsla);
  });

  const providerValue = useMemo(() => {
    return {
      value: color,
      hex,
      isValid,
      statefulColor,
      setColor,
      updateAlpha,
      updateHue,
      updateLightness,
      updateSaturation,
      reset
    };
  }, [color, reset, updateAlpha, updateHue, updateLightness, updateSaturation, hex, isValid, setColor, statefulColor]);
  return <ColorPickerContext.Provider value={providerValue}>{children}</ColorPickerContext.Provider>;
};
