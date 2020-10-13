import formValidators from './validators';
export declare type ColorType = string | {
    default?: string;
    focus?: string;
    error?: string;
    disabled?: string;
};
export declare enum ValidationMessagePosition {
    TOP = "top",
    BOTTOM = "bottom"
}
export declare type Validator = Function | keyof typeof formValidators;
