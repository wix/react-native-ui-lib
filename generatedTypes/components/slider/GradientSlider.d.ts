import React, { Component } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import tinycolor from 'tinycolor2';
import { SliderContextProps } from './context/SliderContext';
declare type SliderOnValueChange = (value: string, alfa: number) => void;
export declare enum GradientSliderTypes {
    DEFAULT = "default",
    HUE = "hue",
    LIGHTNESS = "lightness",
    SATURATION = "saturation"
}
export declare type GradientSliderProps = {
    /**
       * The gradient color
       */
    color?: string;
    /**
       * The gradient type (default, hue, lightness, saturation)
       */
    type?: GradientSliderTypes;
    /**
       * The gradient steps
       */
    gradientSteps?: number;
    /**
       * Callback for onValueChange, returns the updated color
       */
    onValueChange?: SliderOnValueChange;
    /**
       * If true the component will have accessibility features enabled
       */
    accessible?: boolean;
    /**
      * The container style
      */
    containerStyle?: StyleProp<ViewStyle>;
    /**
       * If true the Slider will be disabled and will appear in disabled color
       */
    disabled?: boolean;
};
declare type GradientSliderComponentProps = {
    /**
       * Context of the slider group
       */
    sliderContext: SliderContextProps;
} & GradientSliderProps & typeof defaultProps;
interface GradientSliderState {
    color: tinycolor.ColorFormats.HSLA;
    prevColor: string | undefined;
}
declare const defaultProps: {
    type: GradientSliderTypes;
    gradientSteps: number;
    color: string;
};
/**
 * @description: A Gradient Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SliderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/GradientSlider/GradientSlider.gif?raw=true
 */
declare class GradientSlider extends Component<GradientSliderComponentProps, GradientSliderState> {
    static displayName: string;
    static defaultProps: {
        type: GradientSliderTypes;
        gradientSteps: number;
        color: string;
    };
    static types: typeof GradientSliderTypes;
    constructor(props: GradientSliderComponentProps);
    static getDerivedStateFromProps(nextProps: GradientSliderComponentProps, prevState: GradientSliderState): {
        color: tinycolor.ColorFormats.HSLA;
        prevColor: tinycolor.ColorFormats.HSLA;
    } | null;
    getColor(): tinycolor.ColorFormats.HSLA;
    getStepColor: (i: number) => string;
    renderDefaultGradient: () => JSX.Element;
    renderHueGradient: () => JSX.Element;
    renderLightnessGradient: () => JSX.Element;
    renderSaturationGradient: () => JSX.Element;
    onValueChange: (value: string, alpha: number) => void;
    updateColor(color: tinycolor.ColorFormats.HSLA): void;
    updateAlpha: (a: number) => void;
    updateHue: (h: number) => void;
    updateLightness: (l: number) => void;
    updateSaturation: (s: number) => void;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<{
    /**
       * Context of the slider group
       */
    sliderContext: SliderContextProps;
} & GradientSliderProps & {
    type: GradientSliderTypes;
    gradientSteps: number;
    color: string;
} & {
    useCustomTheme?: boolean | undefined;
}, any> & typeof GradientSlider;
export default _default;
