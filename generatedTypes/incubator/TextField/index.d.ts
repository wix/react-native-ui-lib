import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { ImageProps } from '../../components/image';
import { ValidationMessagePosition } from './types';
import { InputProps } from './Input';
import { ValidationMessageProps } from './ValidationMessage';
import { LabelProps } from './Label';
import { FieldStateProps } from './withFieldState';
import { FloatingPlaceholderProps } from './FloatingPlaceholder';
import { CharCounterProps } from './CharCounter';
interface TextFieldProps extends InputProps, LabelProps, FloatingPlaceholderProps, FieldStateProps, ValidationMessageProps, CharCounterProps {
    leadingIcon?: ImageProps;
    trailingIcon?: ImageProps;
    floatingPlaceholder?: boolean;
    floatingPlaceholderStyle?: TextStyle;
    validationMessagePosition?: ValidationMessagePosition;
    fieldStyle?: ViewStyle;
    containerStyle?: ViewStyle;
}
declare const _default: React.ComponentType<TextFieldProps>;
export default _default;
