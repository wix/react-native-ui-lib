/// <reference types="react" />
import { TextStyle } from 'react-native';
export interface CharCounterProps {
    showCharCounter?: boolean;
    maxLength?: number;
    charCounterStyle?: TextStyle;
}
declare const _default: ({ showCharCounter, maxLength, charCounterStyle }: CharCounterProps) => JSX.Element | null;
export default _default;
