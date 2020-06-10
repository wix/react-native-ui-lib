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
  ColorsModifiers,
  BackgroundColorModifier
} from '../../commons/new';

type TextInputProps = RNTextInputProps &
  MarginModifiers &
  TypographyModifiers &
  BackgroundColorModifier &
  ColorsModifiers;

type Props = TextInputProps &
  BaseComponentInjectedProps &
  ForwardRefInjectedProps;

const TextInput = ({forwardedRef, modifiers, style, ...props}: Props) => {
  const {paddings, margins, typography, backgroundColor, color} = modifiers;
  return (
    <RNTextInput
      {...props}
      ref={forwardedRef}
      style={[
        backgroundColor && {backgroundColor},
        color && {color},
        paddings,
        margins,
        typography,
        style
      ]}
    />
  );
};

export default asBaseComponent<TextInputProps>(forwardRef(TextInput));
