/// <reference types="react" />
import { TextStyle } from 'react-native';
export interface ValidationMessageProps {
    /**
     * Should support showing validation error message
     */
    enableErrors?: boolean;
    /**
     * The validation message to display when field is invalid (depends on validate)
     */
    validationMessage?: string;
    validationMessageStyle?: TextStyle;
    retainSpace?: boolean;
}
declare const _default: ({ validationMessage, enableErrors, validationMessageStyle, retainSpace }: ValidationMessageProps) => JSX.Element | null;
export default _default;
