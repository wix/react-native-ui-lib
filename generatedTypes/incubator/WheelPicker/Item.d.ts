/// <reference types="react" />
import { TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';
export interface ItemProps {
    label: string;
    value: string | number;
}
interface InternalProps extends ItemProps {
    index: number;
    offset: Animated.SharedValue<number>;
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
