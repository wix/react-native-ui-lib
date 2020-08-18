/// <reference types="react" />
import { TextStyle } from 'react-native';
import { ColorType } from './types';
export interface FloatingPlaceholderProps {
    placeholder?: string;
    floatingPlaceholderColor?: ColorType;
    floatingPlaceholderStyle?: TextStyle;
}
declare const _default: ({ placeholder, floatingPlaceholderColor, floatingPlaceholderStyle }: FloatingPlaceholderProps) => JSX.Element;
export default _default;
