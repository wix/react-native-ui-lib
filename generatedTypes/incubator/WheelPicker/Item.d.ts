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
    textStyle?: TextStyle;
    onSelect: (index: number) => void;
}
declare const _default: ({ index, text, textStyle, itemHeight, onSelect, offset }: InternalProps) => JSX.Element;
export default _default;
