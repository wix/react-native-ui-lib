/// <reference types="react" />
import { TextStyle, StyleProp } from 'react-native';
import { ColorType } from './types';
export interface FloatingPlaceholderProps {
    /**
     * The placeholder for the field
     */
    placeholder?: string;
    /**
     * The floating placeholder color
     */
    floatingPlaceholderColor?: ColorType;
    /**
     * Custom style to pass to the floating placeholder
     */
    floatingPlaceholderStyle?: StyleProp<TextStyle>;
}
declare const FloatingPlaceholder: {
    ({ placeholder, floatingPlaceholderColor, floatingPlaceholderStyle }: FloatingPlaceholderProps): JSX.Element;
    displayName: string;
};
export default FloatingPlaceholder;
