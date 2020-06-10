import React from 'react';
import { TextInputProps as RNTextInputProps } from 'react-native';
import { MarginModifiers, TypographyModifiers, ColorsModifiers, BackgroundColorModifier } from '../../commons/new';
declare type TextInputProps = RNTextInputProps & MarginModifiers & TypographyModifiers & BackgroundColorModifier & ColorsModifiers;
declare const _default: React.ComponentType<TextInputProps>;
export default _default;
