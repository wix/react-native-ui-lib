import React from 'react';
import { TextStyle, ViewStyle, FlatListProps } from 'react-native';
import { TextProps } from '../text';
import { FaderProps } from '../fader';
import { WheelPickerItemProps } from './Item';
import { WheelPickerAlign, WheelPickerItemValue } from './types';
export { WheelPickerAlign, WheelPickerItemValue };
export declare const ITEM_HEIGHT = 44;
export type WheelPickerProps<T = WheelPickerItemValue> = {
    /**
     * Initial value
     */
    initialValue?: T;
    /**
     * Data source for WheelPicker
     */
    items?: WheelPickerItemProps<T>[];
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
    onChange?: (item: T, index: number) => void;
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
    disableRTL?: boolean;
    /**
     * Extra style for the separators
     */
    separatorsStyle?: ViewStyle;
    testID?: string;
    /**
     * Change the default (white) tint color of the fade view.
     */
    faderProps?: Omit<FaderProps, 'visible' | 'position'>;
    /**
     * Props to be sent to the FlatList
     */
    flatListProps?: Partial<FlatListProps<WheelPickerItemProps<T>>>;
};
declare const WheelPicker: {
    <T extends WheelPickerItemValue>(props: WheelPickerProps<T>): React.JSX.Element;
    alignments: typeof WheelPickerAlign;
};
export default WheelPicker;
export { WheelPickerItemProps };
