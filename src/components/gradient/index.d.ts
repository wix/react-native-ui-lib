import tinycolor from 'tinycolor2';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export declare enum GradientTypes {
    HUE = "hue",
    LIGHTNESS = "lightness",
    SATURATION = "saturation"
}
export interface GradientProps {
    color?: string | tinycolor.ColorFormats.HSLA;
    type?: GradientTypes | `${GradientTypes}`;
    numberOfSteps: number;
    style?: StyleProp<ViewStyle>;
}
declare const Gradient: {
    (props: GradientProps): React.JSX.Element;
    types: typeof GradientTypes;
};
export default Gradient;
