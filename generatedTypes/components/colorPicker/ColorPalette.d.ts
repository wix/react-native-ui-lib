import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
interface Props {
    /**
     * Array of colors to render in the palette
     */
    colors: string[];
    /**
     * Style to pass the palette container
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * The container margins
     */
    containerWidth?: number;
    /**
     * Whether to use pagination when number of colors exceeds the number of rows
     */
    usePagination?: boolean;
    /**
     * Whether the colors pagination scrolls in a loop
     */
    loop?: boolean;
    /**
     * The number of color rows from 2 to 5
     */
    numberOfRows?: number;
    /**
     * Style to pass all the ColorSwatches in the palette
     */
    swatchStyle?: StyleProp<ViewStyle>;
    /**
     * The value of the selected swatch
     */
    value?: string;
    /**
     * The index of the item to animate at first render (default is last)
     */
    animatedIndex?: number;
    /**
     * Invoked once when value changes by selecting one of the swatches in the palette
     */
    onValueChange?: (value: string, options: object) => void;
    style?: StyleProp<ViewStyle>;
    testID?: string;
}
export declare type ColorPaletteProps = Props;
declare const _default: React.ComponentClass<Props & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
