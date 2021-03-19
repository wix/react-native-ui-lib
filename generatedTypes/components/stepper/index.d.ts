import React, { PureComponent } from 'react';
import { AccessibilityProps, AccessibilityActionEvent } from 'react-native';
interface Props {
    /**
     * Component accessibility label
     */
    accessibilityLabel?: string;
    /**
     * Initial value of the Stepper.
     */
    value?: number;
    /**
     * Minimum value.
     */
    minValue?: number;
    /**
     * Maximum value.
     */
    maxValue?: number;
    /**
     * On value change callback function
     */
    onValueChange?: (value: number, id: Props['id']) => void;
    /**
     * disables interaction with the stepper
     */
    disabled?: boolean;
    /**
     * Unique ID of the Stepper.
     */
    id?: string;
    /**
     * Renders a small sized Stepper
     */
    small?: boolean;
    /**
     * Test id for component
     */
    testID?: string;
}
export declare type StepperProps = Props;
interface State {
    currentStepperValue: number;
}
/**
 * @description: A stepper component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/StepperScreen.js
 */
declare class Stepper extends PureComponent<Props, State> {
    constructor(props: Props);
    UNSAFE_componentWillReceiveProps(nextProps: Props): void;
    getAccessibilityProps(): AccessibilityProps;
    onAccessibilityAction: (event: AccessibilityActionEvent) => void;
    accessibilityActionHandler(actionType: string, newStepperValue: number, actionLimitMsg: string): void;
    allowStepChange(buttonType: string): boolean | undefined;
    handleStepChange(buttonType: string): void;
    renderButton(buttonType: string): JSX.Element;
    render(): JSX.Element;
}
export { Stepper };
declare const _default: React.ComponentClass<Props & {
    useCustomTheme?: boolean | undefined;
}, any> & typeof Stepper;
export default _default;
