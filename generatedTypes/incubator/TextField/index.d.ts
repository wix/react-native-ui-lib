import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { ButtonPropTypes } from '../../components/button';
import { ValidationMessagePosition } from './types';
import { InputProps } from './Input';
import { ValidationMessageProps } from './ValidationMessage';
import { LabelProps } from './Label';
import { FieldStateProps } from './withFieldState';
import { FloatingPlaceholderProps } from './FloatingPlaceholder';
import { CharCounterProps } from './CharCounter';
interface TextFieldProps extends InputProps, LabelProps, FloatingPlaceholderProps, FieldStateProps, ValidationMessageProps, Omit<CharCounterProps, 'maxLength'> {
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
