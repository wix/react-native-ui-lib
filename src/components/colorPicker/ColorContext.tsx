import React, {PropsWithChildren, createContext} from 'react';
import {useSharedValue, useDerivedValue} from 'react-native-reanimated';
import {Colors} from '../../style';

type ColorContextType = {
  hue: ReturnType<typeof useSharedValue<number>>;
  lightness: ReturnType<typeof useSharedValue<number>>;
  saturation: ReturnType<typeof useSharedValue<number>>;
  hexValue: ReturnType<typeof useSharedValue<string>>;
};

function hslToHex(h: number, l: number, s: number) {
  'worklet';
  l *= 100;
  s *= 100;
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `${f(0)}${f(8)}${f(4)}`;
}

const ColorContext = createContext<ColorContextType>({} as ColorContextType);

type ColorContextProviderProps = PropsWithChildren & {
  initialColor: string;
};

export const ColorContextProvider = (props: ColorContextProviderProps) => {
  const {children, initialColor} = props;
  const {h, l, s} = Colors.getHSL(initialColor);
  const hue = useSharedValue(h);
  const lightness = useSharedValue(l);
  const saturation = useSharedValue(s);
  const hexValue = useDerivedValue(() => hslToHex(hue.value, lightness.value, saturation.value));
  return <ColorContext.Provider value={{hue, lightness, saturation, hexValue}}>{children}</ColorContext.Provider>;
};

export default ColorContext;
