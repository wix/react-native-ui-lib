/**
 * Known issues with React Native TextInput component
 * 1. iOS - input inner padding is off in multiline mode
 * 2. Android - input has minHeight that can't be overridden with zero padding (unlike iOS)
 * 3. Passing typography preset that includes lineHeight usually cause alignment issues with
 * other elements (leading/trailing accessories). It usually best to set lineHeight with undefined
 */
import React, { PropsWithChildren, ReactElement } from 'react';
import { ViewStyle, TextStyle, StyleProp } from 'react-native';
import { ForwardRefInjectedProps, BaseComponentInjectedProps, MarginModifiers, PaddingModifiers, TypographyModifiers, ColorsModifiers } from '../../commons/new';
import { ValidationMessagePosition, Validator } from './types';
import { InputProps } from './Input';
import { ValidationMessageProps } from './ValidationMessage';
import { LabelProps } from './Label';
import { FieldContextType as _FieldContextType } from './FieldContext';
import { FloatingPlaceholderProps } from './FloatingPlaceholder';
import { CharCounterProps } from './CharCounter';
export declare type FieldContextType = _FieldContextType;
export declare type TextFieldProps = MarginModifiers & PaddingModifiers & TypographyModifiers & ColorsModifiers & InputProps & LabelProps & FloatingPlaceholderProps & ValidationMessageProps & Omit<CharCounterProps, 'maxLength'> & {
    /**
     * Pass to render a leading element
     */
    leadingAccessory?: ReactElement;
    /**
     * Pass to render a trailing element
     */
    trailingAccessory?: ReactElement;
    /**
     * Pass to render a bottom element below the input
     */
    bottomAccessory?: ReactElement;
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
     * Callback for when field validity has changed
     */
    onChangeValidity?: (isValid: boolean) => void;
    /**
     * The position of the validation message (top/bottom)
     */
    validationMessagePosition?: ValidationMessagePosition;
    /**
     * Internal style for the field container
     */
    fieldStyle?: StyleProp<ViewStyle>;
    /**
     * Internal dynamic style callback for the field container
     */
    dynamicFieldStyle?: (context: FieldContextType, props: {
        preset: TextFieldProps['preset'];
    }) => StyleProp<ViewStyle>;
    /**
     * Container style of the whole component
     */
    containerStyle?: ViewStyle;
    /**
     * Predefined preset to use for styling the field
     */
    preset?: 'default' | null | string;
};
export declare type InternalTextFieldProps = PropsWithChildren<TextFieldProps & BaseComponentInjectedProps & ForwardRefInjectedProps>;
interface StaticMembers {
    validationMessagePositions: typeof ValidationMessagePosition;
}
declare const _default: React.ComponentClass<TextFieldProps & {
    useCustomTheme?: boolean | undefined;
}, any> & StaticMembers;
export default _default;
