import React from 'react';
import { TextStyle } from 'react-native';
import { TextProps } from '../../components/text';
export interface ItemProps {
    label: string;
    fakeLabel?: string;
    fakeLabelStyle?: TextStyle;
    fakeLabelProps?: TextProps;
    value: string | number;
}
declare const _default: React.ComponentClass<ItemProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
