import React, {PropsWithChildren, createContext} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {Colors} from '../../style';

type ColorPickerContextType = {
  hue: ReturnType<typeof useSharedValue<number>>;
  lightness: ReturnType<typeof useSharedValue<number>>;
  saturation: ReturnType<typeof useSharedValue<number>>;
};

const ColorPickerContext = createContext<ColorPickerContextType>({} as ColorPickerContextType);

type ColorPickerContextProviderProps = PropsWithChildren & {
  initialColor: string;
};

export const ColorPickerContextProvider = (props: ColorPickerContextProviderProps) => {
  const {children, initialColor} = props;
  const {h, l, s} = Colors.getHSL(initialColor);
  const hue = useSharedValue(h);
  const lightness = useSharedValue(l);
  const saturation = useSharedValue(s);
  return <ColorPickerContext.Provider value={{hue, lightness, saturation}}>{children}</ColorPickerContext.Provider>;
};

export default ColorPickerContext;
