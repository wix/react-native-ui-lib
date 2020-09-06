import { TextInputProps } from 'react-native';
import validators from './validators';
export declare type Validator = Function | keyof typeof validators;
export interface FieldStateProps extends TextInputProps {
    validateOnStart?: boolean;
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
    /**
     * A single or multiple validator. Can be a string (required, email) or custom function.
     */
    validate?: Validator | Validator[];
}
export default function useFieldState({ validate, validateOnBlur, validateOnChange, validateOnStart, ...props }: FieldStateProps): {
    onFocus: (...args: any) => void;
    onBlur: (...args: any) => void;
    onChangeText: (text: any) => void;
    fieldState: {
        value: string | undefined;
        hasValue: boolean;
        isValid: boolean;
        isFocused: boolean;
    };
};
