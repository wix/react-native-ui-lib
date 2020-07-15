import React, {useCallback, useState, useMemo} from 'react';
import {TextInputProps, ViewStyle} from 'react-native';
import View from '../../components/view';
import {ImageProps} from '../../components/image';
import Input from './Input';
import Icon from './Icon';
import ValidationMessage from './ValidationMessage';
import Label, {LabelProps} from './Label';
import FieldContext from './FieldContext';

interface TextFieldProps extends TextInputProps, LabelProps {
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
    // TextInput
    onFocus,
    onBlur,
    ...others
  }: TextFieldProps,
  ref
) => {
  const [isFocused, setIsFocused] = useState(false);
  const onFieldFocus = useCallback(
    (...args: any) => {
      setIsFocused(true);
      onFocus && onFocus(...args);
    },
    [onFocus]
  );

  const onFieldBlur = useCallback(
    (...args: any) => {
      setIsFocused(false);
      onBlur && onBlur(...args);
    },
    [onBlur]
  );

  const context = useMemo(() => {
    return {isFocused, disabled: others.editable === false};
  }, [isFocused, others.editable]);

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
              {...others}
              onFocus={onFieldFocus}
              onBlur={onFieldBlur}
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

export default React.forwardRef(TextField);
