/// <reference types="react" />
import { TextStyle } from 'react-native';
import { ItemProps } from './Item';
export interface WheelPickerProps {
    /**
     * Data source for WheelPicker
     */
    items?: ItemProps[];
    /**
     * Describe the height of each item in the WheelPicker
     */
    itemHeight?: number;
    /**
     * TextStyle for the focused row
     */
    selectedTextColor?: string;
    /**
     * TextStyle for other, non-focused rows
     */
    unselectedTextStyle?: string;
    /**
     * Row text style
     */
    textStyle?: TextStyle;
    /**
     * Event, on active row change
     */
    onChange: (index: number, item?: ItemProps) => void;
}
declare const WheelPicker: ({ items, itemHeight, selectedTextColor, unselectedTextStyle, onChange: onChangeEvent }: WheelPickerProps) => JSX.Element;
export default WheelPicker;
