import React from 'react';
import {HSLA} from '../GradientSlider';
export interface SliderContextProps {
  value?: HSLA;
  setValue?: (value: HSLA) => void;
}

const SliderContext: React.Context<SliderContextProps> = React.createContext({});
export default SliderContext;
