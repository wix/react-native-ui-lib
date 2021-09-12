import React from 'react';
interface Props {
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
     * The step to increase and decrease by (default is 1)
     */
    step?: number;
    /**
     * On value change callback function
     */
    onValueChange?: (value: number, testID?: string) => void;
    /**
     * disables interaction with the stepper
     */
    disabled?: boolean;
    /**
     * Renders a small sized Stepper
     */
    small?: boolean;
    /**
     * Component accessibility label
     */
    accessibilityLabel?: string;
    /**
     * Test id for component
     */
    testID?: string;
}
export declare type StepperProps = Props;
declare const _default: React.ComponentClass<Props & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
