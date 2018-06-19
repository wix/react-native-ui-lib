/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type RadioGroupProps = {
    value?: string;
    onValueChange?: (...args: any[]) => any;
};
/**
 * Wrap a group of Radio Buttons to automatically control their selection
 */
declare class RadioGroup extends BaseComponent<RadioGroupProps, {}> {
    static displayName: string;
    static childContextTypes: {
        value: any;
        onValueChange: any;
    };
    constructor(props: any);
    getChildContext(): {
        value: any;
        onValueChange: (value: any) => void;
    };
    onValueChange: (value: any) => void;
    state: {};
    render(): JSX.Element;
}
export default RadioGroup;
