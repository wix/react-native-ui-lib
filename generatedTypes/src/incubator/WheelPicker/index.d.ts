import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { ItemProps } from './Item';
import { TextProps } from '../../components/text';
export declare enum WheelPickerAlign {
    CENTER = "center",
    RIGHT = "right",
    LEFT = "left"
}
export interface WheelPickerProps {
    /**
     * Initial value (doesn't work with selectedValue)
     */
    initialValue?: ItemProps | number | string;
    /**
     * The current selected value
     */
    selectedValue?: ItemProps | number | string;
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
    textStyle?: Omit<TextStyle, 'color'>;
    /**
     * Additional label on the right of the item text
     */
    label?: string;
    /**
     * The Additional label's style
     */
    labelStyle?: TextStyle;
    /**
     * The Additional label's props
     */
    labelProps?: TextProps;
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
     * Align the content to center, right ot left (default: center)
     */
    align?: WheelPickerAlign;
    testID?: string;
}
declare const _default: React.ComponentClass<WheelPickerProps & {
    useCustomTheme?: boolean | undefined;
}, any> & {
    ({ items: propItems, itemHeight, numberOfVisibleRows, activeTextColor, inactiveTextColor, textStyle, label, labelStyle, labelProps, onChange, align, style, children, initialValue, selectedValue, testID }: WheelPickerProps): JSX.Element;
    alignments: typeof WheelPickerAlign;
    displayName: string;
};
export default _default;
export { ItemProps as WheelPickerItemProps };
