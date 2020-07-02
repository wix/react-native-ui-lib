/// <reference types="react" />
import { TextStyle } from 'react-native';
import { ItemProps } from './Item';
export interface WheelPickerProps {
    items?: ItemProps[];
    itemHeight?: number;
    itemTextStyle?: TextStyle;
    onChange: (item: ItemProps, index: number) => void;
}
declare const WheelPicker: ({ items, itemHeight, itemTextStyle }: WheelPickerProps) => JSX.Element;
export default WheelPicker;
