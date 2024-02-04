import React from 'react';
import type {GradientSliderTypes} from '../GradientSlider';
export interface SliderContextProps {
  value?: tinycolor.ColorFormats.HSLA;
  setValue?: (value: tinycolor.ColorFormats.HSLA, type?: GradientSliderTypes) => void;
}

const SliderContext: React.Context<SliderContextProps> = React.createContext({});
export default SliderContext;
