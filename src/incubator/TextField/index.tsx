import React, {useCallback, useState, useMemo} from 'react';
import {TextInputProps, ViewStyle} from 'react-native';
import View from '../../components/view';
import {ImageProps} from '../../components/image';
import Input from './Input';
import Icon from './Icon';
import ValidationMessage from './ValidationMessage';
import Label, {LabelProps} from './Label';
import FieldContext from './FieldContext';
import withFieldState, {FieldState} from './withFieldState';

interface TextFieldProps extends TextInputProps, LabelProps, FieldState {
  leadingIcon?: ImageProps;
  trailingIcon?: ImageProps;
  validationMessage?: string;
  labelColor?: string;
  fieldStyle?: ViewStyle;
  containerStyle?: ViewStyle;
}

const TextField = (
  {
    // General
    fieldStyle,
    containerStyle,
    // Label
    label,
    labelColor,
    labelStyle,
    labelProps,
    // Icons
    leadingIcon,
    trailingIcon,
    // Validation
    validationMessage,
    // FieldState
    isFocused,
    isValid,
    // Input
    ...props
  }: TextFieldProps,
  ref
) => {
  const context = useMemo(() => {
    return {isFocused, disabled: props.editable === false};
  }, [isFocused, props.editable]);

  return (
    <FieldContext.Provider value={context}>
      <View style={containerStyle}>
        <Label
          label={label}
          labelColor={labelColor}
          labelStyle={labelStyle}
          labelProps={labelProps}
        />
        <View style={fieldStyle}>
          <View row>
            {leadingIcon && <Icon {...leadingIcon} />}
            <Input
              {...props}
              ref={ref}
            />
            {trailingIcon && <Icon {...trailingIcon} />}
          </View>
        </View>
        <ValidationMessage>{validationMessage}</ValidationMessage>
      </View>
    </FieldContext.Provider>
  );
};

export default withFieldState(React.forwardRef(TextField));
