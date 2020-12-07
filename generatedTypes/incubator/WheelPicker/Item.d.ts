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
    activeColor?: string;
    inactiveColor?: string;
    style?: TextStyle;
    onSelect: (index: number) => void;
}
declare const _default: ({ index, text, itemHeight, onSelect, offset, activeColor, inactiveColor, style }: InternalProps) => JSX.Element;
export default _default;
