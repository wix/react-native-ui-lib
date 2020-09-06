import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { ForwardRefInjectedProps } from '../../commons/new';
export interface InputProps extends TextInputProps, React.ComponentPropsWithRef<typeof TextInput> {
    /**
     * A hint text to display when focusing the field
     */
    hint?: string;
}
declare const Input: {
    ({ style, hint, forwardedRef, ...props }: InputProps & ForwardRefInjectedProps): JSX.Element;
    displayName: string;
};
export default Input;
