/// <reference types="tinycolor2" />
import React from 'react';
import { ColorSliderGroupProps } from './types';
/**
 * @description: A Gradient Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SliderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ColorSliderGroup/ColorSliderGroup.gif?raw=true
 */
declare const ColorSliderGroup: {
    <T extends string | import("tinycolor2").ColorFormats.HSLA = string>(props: ColorSliderGroupProps<T>): React.JSX.Element;
    displayName: string;
};
export default ColorSliderGroup;
