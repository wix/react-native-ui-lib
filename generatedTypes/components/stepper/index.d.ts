/// <reference types="react" />
import { AccessibilityProps } from 'react-native';
import { PureBaseComponent } from '../../commons';
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
interface State {
    currentStepperValue: number;
}
/**
 * @description: A stepper component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/StepperScreen.js
 */
declare class Stepper extends PureBaseComponent<Props, State> {
    constructor(props: Props);
    UNSAFE_componentWillReceiveProps(nextProps: Props): void;
    getAccessibilityProps(): AccessibilityProps;
    onAccessibilityAction: (event: any) => void;
    accessibilityActionHandler(actionType: any, newStepperValue: any, actionLimitMsg: any): void;
    allowStepChange(buttonType: string): boolean | undefined;
    handleStepChange(buttonType: string): void;
    renderButton(buttonType: string): JSX.Element;
    render(): JSX.Element;
}
export default Stepper;
