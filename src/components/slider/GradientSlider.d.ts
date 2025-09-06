/// <reference types="tinycolor2" />
import React from 'react';
import { ForwardRefInjectedProps } from '../../commons/new';
import { ComponentStatics } from '../../typings/common';
import { GradientSliderProps, GradientSliderTypes } from './types';
type Props<T> = GradientSliderProps<T> & ForwardRefInjectedProps;
declare const _default: React.ForwardRefExoticComponent<Omit<import("./types").SliderProps, "onValueChange"> & {
    color?: string | import("tinycolor2").ColorFormats.HSLA | undefined;
    type?: "default" | "hue" | "saturation" | "lightness" | GradientSliderTypes | undefined;
    gradientSteps?: number | undefined;
    onValueChange?: ((value: string, alfa: number) => void) | undefined;
    accessible?: boolean | undefined;
    containerStyle?: import("react-native/types").StyleProp<import("react-native/types").ViewStyle>;
    disabled?: boolean | undefined;
} & React.RefAttributes<any>> & ComponentStatics<{
    <T extends string | import("tinycolor2").ColorFormats.HSLA = string>(props: Props<T>): React.JSX.Element;
    displayName: string;
    types: typeof GradientSliderTypes;
}>;
export default _default;
