import React from 'react';
export type StepperType = 'default' | 'floating';
interface Props {
    /**
     * Stepper style type
     */
    type?: StepperType;
    /**
     * Stepper value.
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
export type StepperProps = Props;
declare const _default: React.ForwardRefExoticComponent<Props & React.RefAttributes<any>>;
export default _default;
