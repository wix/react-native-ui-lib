/// <reference types="react" />
import { BaseComponent } from "../../commons";
declare type StepperProps = {
    label?: string;
    min: number;
    max?: number;
    containerStyle?: object;
    onValueChange?: (...args: any[]) => any;
    initialValue: number;
};
declare type StepperState = {
    value: any;
};
/**
 * @description: Stepper component with increase and decrease buttons
 * @gif: https://media.giphy.com/media/3oFzm47bk0v4WV15O8/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FormScreen.js
 */
export default class Stepper extends BaseComponent<StepperProps, StepperState> {
    static displayName: string;
    constructor(props: any);
    generateStyles(): void;
    getLabel(): string;
    getDisabledState(): {
        minusDisabled: boolean;
        plusDisabled: boolean;
    };
    updateValue(value: any): void;
    render(): JSX.Element;
}
export {};
