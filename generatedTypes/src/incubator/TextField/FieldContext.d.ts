/// <reference types="react" />
export declare type FieldContextType = {
    value?: string;
    isFocused: boolean;
    hasValue: boolean;
    isValid: boolean;
    failingValidatorIndex?: number;
    disabled: boolean;
    validateField: () => void;
};
declare const FieldContext: import("react").Context<FieldContextType>;
export default FieldContext;
