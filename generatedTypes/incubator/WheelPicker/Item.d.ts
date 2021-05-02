/// <reference types="react" />
import { TextStyle } from 'react-native';
export interface ItemProps {
    label: string;
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
    testID?: string;
    centerH?: boolean;
}
declare const _default: ({ index, label, itemHeight, onSelect, offset, activeColor, inactiveColor, style, testID, centerH }: InternalProps) => JSX.Element;
export default _default;
