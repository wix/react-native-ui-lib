import React from 'react';
import { WheelPickerAlign } from './types';
export interface ItemProps {
    label: string;
    value: string | number;
    align?: WheelPickerAlign;
}
declare const _default: React.ComponentClass<ItemProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
