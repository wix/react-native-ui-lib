/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type PickerDialogProps = {
    selectedValue?: number | string;
    onValueChange?: (...args: any[]) => any;
    onDone?: (...args: any[]) => any;
    onCancel?: (...args: any[]) => any;
    topBarProps?: object;
};
declare class PickerDialog extends BaseComponent<PickerDialogProps, {}> {
    state: {};
    renderHeader(): JSX.Element;
    renderPicker(): any;
    render(): JSX.Element;
}
export default PickerDialog;
