/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type RadioButtonProps = {
    value: string;
    onValueChange?: (...args: any[]) => any;
    color?: string;
    size?: number;
    borderRadius?: number;
};
/**
 * A Radio Button component, should be wrapped inside a RadioGroup
 */
declare class RadioButton extends BaseComponent<RadioButtonProps, {}> {
    static displayName: string;
    static contextTypes: {
        value: any;
        onValueChange: any;
    };
    state: {};
    generateStyles(): void;
    onPress: () => void;
    isSelected(): boolean;
    render(): JSX.Element;
}
export default RadioButton;
