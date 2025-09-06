import React from 'react';
import { HSLA } from './types';
export interface SliderContextType {
    value?: HSLA;
    setValue?: (value: HSLA) => void;
}
declare const SliderContext: React.Context<SliderContextType>;
export default SliderContext;
