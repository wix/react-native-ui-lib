import { Component } from 'react';
declare type WheelPickerItemProps = {
    /**
     * the picker item value
     */
    value: string | number;
    /**
     * the picker item display label
     */
    label: string;
};
export default class WheelPickerItem extends Component<WheelPickerItemProps> {
    static displayName: string;
    render(): null;
}
export {};
