/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type CheckboxProps = {
    value?: boolean;
    onValueChange?: (...args: any[]) => any;
    color?: string;
    size?: number;
    borderRadius?: number;
    selectedIcon?: number;
    iconColor?: string;
};
/**
 * Checkbox component for toggling boolean value related to some context
 */
declare class Checkbox extends BaseComponent<CheckboxProps, {}> {
    static displayName: string;
    generateStyles(): void;
    onPress: () => void;
    render(): JSX.Element;
}
export default Checkbox;
