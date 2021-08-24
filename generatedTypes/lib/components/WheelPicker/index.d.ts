/// <reference types="react" />
import { ViewStyle, TextStyle } from 'react-native';
export declare type WheelPickerProps = {
    /**
      * the current selected value of the picker
      */
    selectedValue?: string | number;
    /**
     * callback for when a value change
     */
    onValueChange?: (value: string | number, index: number) => void;
    /**
     * pass custom style
     */
    style?: ViewStyle;
    /**
     * pass custom label style: fontSize, fontFamily, color<br>
     * Note: label's color will override the text color (hex only)
     */
    labelStyle?: TextStyle;
    /**
     * The height of the selected item
     */
    itemHeight?: number;
    /**
     * The color of the wheel picker (hex only)
     */
    color?: string;
    /**
     * pass custom style for the picker item
     */
    itemStyle?: ViewStyle;
    children?: JSX.Element | JSX.Element[];
};
declare const _default: any;
export default _default;
