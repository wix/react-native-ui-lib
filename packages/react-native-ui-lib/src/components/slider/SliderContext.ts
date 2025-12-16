import React from 'react';
import {HSLA} from './types';

export interface SliderContextType {
  value?: HSLA;
  setValue?: (value: HSLA) => void;
}

const SliderContext: React.Context<SliderContextType> = React.createContext({});
SliderContext.displayName = 'IGNORE';
export default SliderContext;
