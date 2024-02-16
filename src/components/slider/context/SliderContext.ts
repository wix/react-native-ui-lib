import React from 'react';
import {HSLA} from '../types';

export interface SliderContextProps {
  value?: HSLA;
  setValue?: (value: HSLA) => void;
}

const SliderContext: React.Context<SliderContextProps> = React.createContext({});
SliderContext.displayName = 'IGNORE';
export default SliderContext;
