import React from "react";
declare type StepperButtonProps = {
    label?: string;
    testId?: string;
    styles: object;
    disabled?: boolean;
    onPress?: (...args: any[]) => any;
};
declare const StepperButton: React.SFC<StepperButtonProps>;
export default StepperButton;
