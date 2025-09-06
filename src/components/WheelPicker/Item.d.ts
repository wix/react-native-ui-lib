import React from 'react';
import { TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { TextProps } from '../text';
import { WheelPickerAlign, WheelPickerItemValue } from './types';
export interface WheelPickerItemProps<T = WheelPickerItemValue> {
    label: string;
    value: T;
    align?: WheelPickerAlign;
    disableRTL?: boolean;
}
interface InternalProps<T> extends WheelPickerItemProps<T> {
    index: number;
    offset: Animated.SharedValue<number>;
    itemHeight: number;
    activeColor?: string;
    inactiveColor?: string;
    style?: TextStyle;
    onSelect: (index: number) => void;
    onPress?: () => void;
    centerH?: boolean;
    fakeLabel?: string;
    fakeLabelStyle?: TextStyle;
    fakeLabelProps?: TextProps;
    testID?: string;
}
declare const _default: React.MemoExoticComponent<(<T extends WheelPickerItemValue = number>(props: InternalProps<T>) => React.JSX.Element)>;
export default _default;
