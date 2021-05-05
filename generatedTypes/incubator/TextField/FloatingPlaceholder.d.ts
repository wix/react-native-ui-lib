/// <reference types="react" />
import { TextStyle, StyleProp } from 'react-native';
import { ColorType, ValidationMessagePosition } from './types';
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
    /**
     * Should placeholder float on focus or when start typing
     */
    floatOnFocus?: boolean;
    validationMessagePosition?: ValidationMessagePosition;
}
declare const FloatingPlaceholder: {
    ({ placeholder, floatingPlaceholderColor, floatingPlaceholderStyle, floatOnFocus, validationMessagePosition }: FloatingPlaceholderProps): JSX.Element;
    displayName: string;
};
export default FloatingPlaceholder;
