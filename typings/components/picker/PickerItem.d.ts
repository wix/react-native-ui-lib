/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type PickerItemProps = {
    label?: string;
    value?: object | string | number;
    getItemLabel?: (...args: any[]) => any;
    getItemValue?: (...args: any[]) => any;
    isSelected?: boolean;
    disabled?: boolean;
    renderItem?: (...args: any[]) => any;
    onPress?: (...args: any[]) => any;
    onSelectedLayout?: (...args: any[]) => any;
};
/**
 * @description: Picker.Item, for configuring the Picker's selectable options
 * @extends: TouchableOpacity
 * @extendslink: docs/TouchableOpacity
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FormScreen.js
 */
declare class PickerItem extends BaseComponent<PickerItemProps, {}> {
    static displayName: string;
    generateStyles(): void;
    getLabel(): any;
    renderSelectedIndicator(): JSX.Element;
    renderItem(): JSX.Element;
    onSelectedLayout: (...args: any[]) => void;
    render(): JSX.Element;
}
export default PickerItem;
