import { Validator } from './types';
import { InputProps } from './Input';
export interface FieldStateProps extends InputProps {
    validateOnStart?: boolean;
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
    /**
     * A single or multiple validator. Can be a string (required, email) or custom function.
     */
    validate?: Validator | Validator[];
    /**
     * Callback for when field validity has changed
     */
    onChangeValidity?: (isValid: boolean) => void;
}
export default function useFieldState({ validate, validateOnBlur, validateOnChange, validateOnStart, onChangeValidity, ...props }: FieldStateProps): {
    onFocus: (...args: any) => void;
    onBlur: (...args: any) => void;
    onChangeText: (text: any) => void;
    fieldState: {
        value: string | undefined;
        hasValue: boolean;
        isValid: boolean;
        isFocused: boolean;
        failingValidatorIndex: number | undefined;
    };
    validateField: (valueToValidate?: any) => void;
};
