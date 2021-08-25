import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
interface Props {
    /**
     * The identifier value of the ColorSwatch in a ColorSwatch palette.
     * Must be different than other ColorSwatches in the same group
     */
    value?: string;
    /**
     * The color of the ColorSwatch
     */
    color?: string;
    /**
     * Is the initial state is selected
     */
    selected?: boolean;
    /**
     * Is first render should be animated
     */
    animated?: boolean;
    /**
     * onPress callback
     */
    onPress?: (value: string, options: object) => void;
    index?: number;
    style?: StyleProp<ViewStyle>;
    testID?: string;
}
export declare type ColorSwatchProps = Props;
export declare const SWATCH_MARGIN = 12;
export declare const SWATCH_SIZE: number;
declare const _default: React.ComponentClass<Props & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
