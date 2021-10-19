/// <reference types="react" />
import { TextStyle } from 'react-native';
import { FieldStateProps } from './useFieldState';
export interface ValidationMessageProps {
    /**
     * Should support showing validation error message
     */
    enableErrors?: boolean;
    /**
     * The validation message to display when field is invalid (depends on validate)
     */
    validationMessage?: string | string[];
    /**
     * Custom style for the validation message
     */
    validationMessageStyle?: TextStyle;
    /**
     * Should validate when the TextField mounts
     */
    validateOnStart?: boolean;
    retainSpace?: boolean;
    validate?: FieldStateProps['validate'];
}
declare const ValidationMessage: {
    ({ validationMessage, enableErrors, validationMessageStyle, retainSpace, validate, validateOnStart }: ValidationMessageProps): JSX.Element | null;
    displayName: string;
};
export default ValidationMessage;
