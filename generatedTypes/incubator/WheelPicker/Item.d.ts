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
    activeIndex: number;
    onSelect: (index: number) => void;
}
declare const _default: ({ index, text, textStyle, itemHeight, onSelect, activeIndex }: InternalProps) => JSX.Element;
export default _default;
