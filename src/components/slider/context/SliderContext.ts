import React from 'react';

export interface SliderContextProps {
  value?: tinycolor.ColorFormats.HSLA;
  setValue?: (value: tinycolor.ColorFormats.HSLA) => void;
}

const SliderContext = React.createContext({});
export default SliderContext;
