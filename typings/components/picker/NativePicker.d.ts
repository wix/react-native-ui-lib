/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type PickerState = {
    selectedValue: any;
    items: any;
};
declare class Picker extends BaseComponent<{}, PickerState> {
    state: {
        selectedValue: any;
        items: any;
    };
    extractPickerItems(props: any): any;
    onCancel: () => void;
    onDone: () => void;
    onValueChange: (selectedValue: any) => void;
    getLabel(): any;
    renderPickerDialog: () => JSX.Element;
    render(): JSX.Element;
}
export default Picker;
