/// <reference types="react" />
import { TextStyle } from 'react-native';
export interface ItemProps {
    text: string;
    value: string | number;
}
interface InternalProps extends ItemProps {
    index: number;
    offset: any;
    itemHeight: number;
    selectedColor?: string;
    unselectedColor?: string;
    style?: TextStyle;
    onSelect: (index: number) => void;
}
declare const _default: ({ index, text, itemHeight, onSelect, offset, selectedColor, unselectedColor, style }: InternalProps) => JSX.Element;
export default _default;
