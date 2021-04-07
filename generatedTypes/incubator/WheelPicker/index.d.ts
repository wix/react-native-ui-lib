import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { ItemProps } from './Item';
export interface WheelPickerProps {
    /**
     * Data source for WheelPicker
     */
    items?: ItemProps[];
    /**
     * Describe the height of each item in the WheelPicker
     * default value: 44
     */
    itemHeight?: number;
    /**
     * Describe the number of rows visible
     * default value: 5
     */
    numberOfVisibleRows?: number;
    /**
     * Text color for the focused row
     */
    activeTextColor?: string;
    /**
     * Text color for other, non-focused rows
     */
    inactiveTextColor?: string;
    /**
     * Row text style
     */
    textStyle?: TextStyle;
    /**
     * Event, on active row change
     */
    onChange?: (item: string | number, index: number) => void;
    /**
     * Container's ViewStyle, height is computed according to itemHeight * numberOfVisibleRows
     */
    style?: Omit<ViewStyle, 'height'>;
    /**
     * Support passing items as children props
     */
    children?: JSX.Element | JSX.Element[];
    /**
     * WheelPicker initial value, can be ItemProps.value, number as index
     */
    selectedValue: ItemProps | number | string;
}
declare const WheelPicker: React.MemoExoticComponent<({ items: propItems, itemHeight, numberOfVisibleRows, activeTextColor, inactiveTextColor, textStyle, onChange, style, children, selectedValue }: WheelPickerProps) => JSX.Element>;
export default WheelPicker;
