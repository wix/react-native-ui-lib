/// <reference types="react" />
import { TextStyle } from 'react-native';
export interface CharCounterProps {
    showCharCounter?: boolean;
    maxLength: number;
    charCounterStyle?: TextStyle;
}
declare const _default: ({ maxLength, charCounterStyle }: CharCounterProps) => JSX.Element;
export default _default;
