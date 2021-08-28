import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { ForwardRefInjectedProps } from '../../commons/new';
import { ColorType } from './types';
export interface InputProps extends Omit<TextInputProps, 'placeholderTextColor'>, Omit<React.ComponentPropsWithRef<typeof TextInput>, 'placeholderTextColor'> {
    /**
     * A hint text to display when focusing the field
     */
    hint?: string;
    /**
     * Input color
     */
    color?: ColorType;
    /**
     * placeholder text color
     */
    placeholderTextColor?: ColorType;
}
declare const Input: {
    ({ style, hint, color, forwardedRef, ...props }: InputProps & ForwardRefInjectedProps): JSX.Element;
    displayName: string;
};
export default Input;
