import { Component } from "react";
import { Picker } from "react-native";
declare type WheelPickerProps = {
    selectedValue?: string | number;
    onValueChange?: (...args: any[]) => any;
    style?: object | number;
    itemStyle?: object | number;
};
declare type WheelPickerState = {
    selectedIndex: number;
    items: any[];
};
declare class WheelPicker extends Component<WheelPickerProps, WheelPickerState> {
    static displayName: string;
    constructor(props: any);
    state: {
        selectedIndex: number;
        items: any[];
    };
    UNSAFE_componentWillReceiveProps(nextProps: any): void;
    stateFromProps(props: any): {
        selectedIndex: number;
        items: any[];
    };
    extractLabelsFromItems(): any[];
    onValueChange(event: any): void;
    render(): JSX.Element;
}
declare const _default: typeof WheelPicker | typeof Picker;
export default _default;
