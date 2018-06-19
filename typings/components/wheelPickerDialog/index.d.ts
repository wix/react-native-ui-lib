import { Component } from "react";
declare type WheelPickerDialogProps = {
    items?: any[];
    selectedValue?: string | number;
    title?: string;
    onCancel?: (...args: any[]) => any;
    onSelect?: (...args: any[]) => any;
    onValueChange?: (...args: any[]) => any;
};
declare type WheelPickerDialogState = {
    currentValue: any | boolean;
    initalSelectedValue: any;
};
export default class WheelPickerDialog extends Component<WheelPickerDialogProps, WheelPickerDialogState> {
    static displayName: string;
    constructor(props: any);
    state: {
        initalSelectedValue: string | number;
        currentValue: boolean;
    };
    onValueChange(value: any, index: any): void;
    onSelect(): void;
    render(): JSX.Element;
}
export {};
