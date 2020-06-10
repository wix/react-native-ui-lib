import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps
} from 'react-native';
import {
  asBaseComponent,
  forwardRef,
  BaseComponentInjectedProps,
  ForwardRefInjectedProps,
  MarginModifiers,
  TypographyModifiers,
  ColorsModifiers
} from '../../commons/new';

type TextInputProps = RNTextInputProps &
  MarginModifiers &
  TypographyModifiers &
  ColorsModifiers;

type Props = TextInputProps &
  BaseComponentInjectedProps &
  ForwardRefInjectedProps;

const TextInput = ({forwardedRef, modifiers, style, ...props}: Props) => {
  const {paddings, margins, typography, color} = modifiers;
  return (
    <RNTextInput
      {...props}
      ref={forwardedRef}
      style={[color && {color}, paddings, margins, typography, style]}
    />
  );
};

export default asBaseComponent<TextInputProps>(forwardRef(TextInput));
