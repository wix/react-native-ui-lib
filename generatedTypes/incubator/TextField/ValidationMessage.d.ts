/// <reference types="react" />
import { TextStyle } from 'react-native';
export interface ValidationMessageProps {
    enableErrors?: boolean;
    validationMessage?: string;
    validationMessageStyle?: TextStyle;
    retainSpace?: boolean;
}
declare const _default: ({ validationMessage, enableErrors, validationMessageStyle, retainSpace }: ValidationMessageProps) => JSX.Element | null;
export default _default;
