import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { ButtonPropTypes } from '../../components/button';
import { ValidationMessagePosition } from './types';
import { InputProps } from './Input';
import { ValidationMessageProps } from './ValidationMessage';
import { LabelProps } from './Label';
import { Validator } from './useFieldState';
import { FloatingPlaceholderProps } from './FloatingPlaceholder';
import { CharCounterProps } from './CharCounter';
interface TextFieldProps extends InputProps, LabelProps, FloatingPlaceholderProps, ValidationMessageProps, Omit<CharCounterProps, 'maxLength'> {
    /**
     * Pass to render a leading button/icon
     */
    leadingButton?: ButtonPropTypes;
    /**
     * Pass to render a trailing button/icon
     */
    trailingButton?: ButtonPropTypes;
    /**
     * Pass to add floating placeholder support
     */
    floatingPlaceholder?: boolean;
    /**
     * Custom style for the floating placeholder
     */
    floatingPlaceholderStyle?: TextStyle;
    /**
     * A single or multiple validator. Can be a string (required, email) or custom function.
     */
    validate?: Validator | Validator[];
    /**
     * Should validate when the TextField mounts
     */
    validateOnStart?: boolean;
    /**
     * Should validate when the TextField value changes
     */
    validateOnChange?: boolean;
    /**
     * Should validate when losing focus of TextField
     */
    validateOnBlur?: boolean;
    /**
     * The position of the validation message (top/bottom)
     */
    validationMessagePosition?: ValidationMessagePosition;
    /**
     * Internal style for the field container
     */
    fieldStyle?: ViewStyle;
    /**
     * Container style of the whole component
     */
    containerStyle?: ViewStyle;
}
interface StaticMembers {
    validationMessagePositions: typeof ValidationMessagePosition;
}
declare const _default: React.ComponentClass<TextFieldProps & {
    useCustomTheme?: boolean | undefined;
}, any> & StaticMembers;
export default _default;
