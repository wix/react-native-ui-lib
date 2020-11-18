/// <reference types="react" />
import { TextStyle, StyleProp } from 'react-native';
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
    activeItemTextStyle?: StyleProp<TextStyle>;
    /**
     * TextStyle for other, non-focused rows
     */
    inactiveItemTextStyle?: StyleProp<TextStyle>;
    /**
     * Event, on active row change
     */
    onChange: (index: number, item?: ItemProps) => void;
}
declare const WheelPicker: ({ items, itemHeight, activeItemTextStyle, onChange: onChangeEvent }: WheelPickerProps) => JSX.Element;
export default WheelPicker;
