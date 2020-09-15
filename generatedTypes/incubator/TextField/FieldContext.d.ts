/// <reference types="react" />
export declare type ContextType = {
    value?: string;
    isFocused: boolean;
    hasValue: boolean;
    isValid: boolean;
    failingValidatorIndex?: number;
    disabled: boolean;
};
declare const FieldContext: import("react").Context<ContextType>;
export default FieldContext;
