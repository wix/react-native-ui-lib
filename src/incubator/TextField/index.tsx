import React, {useCallback, useState, useMemo} from 'react';
import {TextInputProps, ViewStyle} from 'react-native';
import View from '../../components/view';
import Text from '../../components/text';
import {ImageProps} from '../../components/image';
import Input from './Input';
import Icon from './Icon';
import ValidationMessage from './ValidationMessage';
import Label, {LabelProps} from './Label';
import FieldContext from './FieldContext';
import withFieldState, {FieldState} from './withFieldState';
import FloatingPlaceholder from './FloatingPlaceholder';

interface TextFieldProps
  extends TextInputProps,
    LabelProps,
    Omit<FieldState, keyof TextInputProps> {
  leadingIcon?: ImageProps;
  trailingIcon?: ImageProps;
  floatingPlaceholder?: boolean;
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
    floatingPlaceholder,
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
    hasValue,
    // Input
    placeholder,
    ...props
  }: TextFieldProps,
  ref
) => {
  const context = useMemo(() => {
    return {isFocused, hasValue, disabled: props.editable === false};
  }, [isFocused, hasValue, props.editable]);

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
          <View row centerV>
            {leadingIcon && <Icon {...leadingIcon} />}
            <View flex>
              {floatingPlaceholder && <FloatingPlaceholder placeholder={placeholder} />}
              <Input {...props} placeholder={floatingPlaceholder ? undefined : placeholder} ref={ref} />
            </View>
            {trailingIcon && <Icon {...trailingIcon} />}
          </View>
        </View>
        <ValidationMessage>{validationMessage}</ValidationMessage>
      </View>
    </FieldContext.Provider>
  );
};

export default withFieldState(React.forwardRef(TextField));
