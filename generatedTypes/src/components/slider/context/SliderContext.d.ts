/// <reference types="tinycolor2" />
import React from 'react';
export interface SliderContextProps {
    value?: tinycolor.ColorFormats.HSLA;
    setValue?: (value: tinycolor.ColorFormats.HSLA) => void;
}
declare const SliderContext: React.Context<SliderContextProps>;
export default SliderContext;
