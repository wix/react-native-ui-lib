import React, { PureComponent, GetDerivedStateFromProps } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { GradientSliderTypes } from './GradientSlider';
declare type SliderOnValueChange = (value: string) => void;
export declare type ColorSliderGroupProps = {
    /**
       * The gradient color
       */
    initialColor: string;
    /**
       * Callback for onValueChange returns the new hex color
       */
    onValueChange?: SliderOnValueChange;
    /**
       * Group container style
       */
    containerStyle?: StyleProp<ViewStyle>;
    /**
       * Sliders style
       */
    sliderContainerStyle?: StyleProp<ViewStyle>;
    /**
       * Show the sliders labels (defaults are: Hue, Lightness, Saturation)
       */
    showLabels?: boolean;
    /**
       * In case you would like to change the default labels (translations etc.), you can provide
       * this prop with a map to the relevant labels ({hue: ..., lightness: ..., saturation: ...}).
       */
    labels?: {
        [key in GradientSliderTypes]: string;
    };
    /**
       * The labels style
       */
    labelsStyle?: StyleProp<TextStyle>;
    /**
       * If true the component will have accessibility features enabled
       */
    accessible?: boolean;
};
interface ColorSliderGroupState {
    initialColor: string;
}
/**
 * @description: A Gradient Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SliderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ColorSliderGroup/ColorSliderGroup.gif?raw=true
 */
declare class ColorSliderGroup extends PureComponent<ColorSliderGroupProps, ColorSliderGroupState> {
    static displayName: string;
    static defaultProps: {
        labels: {
            hue: string;
            lightness: string;
            saturation: string;
        };
    };
    state: {
        initialColor: string;
    };
    static getDerivedStateFromProps: GetDerivedStateFromProps<ColorSliderGroupProps, ColorSliderGroupState>;
    onValueChange: (value: string) => void;
    renderSlider: (type: GradientSliderTypes) => JSX.Element;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<ColorSliderGroupProps & {
    useCustomTheme?: boolean | undefined;
}, any> & typeof ColorSliderGroup;
export default _default;
