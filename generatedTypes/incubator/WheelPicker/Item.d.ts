import React from 'react';
import { TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { TextProps } from '../../components/text';
export interface ItemProps {
    label: string;
    fakeLabel?: string;
    fakeLabelStyle?: TextStyle;
    fakeLabelProps?: TextProps;
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
declare const _default: React.MemoExoticComponent<({ index, label, fakeLabel, fakeLabelStyle, fakeLabelProps, itemHeight, onSelect, offset, activeColor, inactiveColor, style, testID, centerH }: InternalProps) => JSX.Element>;
export default _default;
