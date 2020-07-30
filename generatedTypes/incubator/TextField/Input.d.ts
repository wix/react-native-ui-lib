import React from 'react';
import { TextInputProps } from 'react-native';
export interface InputProps extends TextInputProps {
    hint?: string;
}
declare const _default: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<unknown>>;
export default _default;
