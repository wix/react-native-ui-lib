/**
 * Known issues with React Native TextInput component
 * 1. iOS - input inner padding is off in multiline mode
 * 2. Android - input has minHeight that can't be overridden with zero padding (unlike iOS)
 * 3. Passing typography preset that includes lineHeight usually cause alignment issues with
 * other elements (leading/trailing accessories). It usually best to set lineHeight with undefined
 */
import React, {ReactElement, useMemo} from 'react';
import {ViewStyle, TextStyle} from 'react-native';
import {omit, isFunction} from 'lodash';
import {
  asBaseComponent,
  forwardRef,
  ForwardRefInjectedProps,
  BaseComponentInjectedProps,
  MarginModifiers,
  PaddingModifiers,
  TypographyModifiers,
  ColorsModifiers
} from '../../commons/new';
import View from '../../components/view';
import {ValidationMessagePosition, Validator} from './types';
import Input, {InputProps} from './Input';
import ValidationMessage, {ValidationMessageProps} from './ValidationMessage';
import Label, {LabelProps} from './Label';
import FieldContext, {FieldContextType as _FieldContextType} from './FieldContext';
import useFieldState /* , FieldStateProps */ from './useFieldState';
import usePreset from './usePreset';
import FloatingPlaceholder, {FloatingPlaceholderProps} from './FloatingPlaceholder';
import CharCounter, {CharCounterProps} from './CharCounter';

export type FieldContextType = _FieldContextType;
export type TextFieldProps = MarginModifiers &
  PaddingModifiers &
  TypographyModifiers &
  ColorsModifiers &
  InputProps &
  LabelProps &
  FloatingPlaceholderProps &
  // We're declaring these props explicitly here for react-docgen (which can't read hooks)
  // FieldStateProps &
  ValidationMessageProps &
  Omit<CharCounterProps, 'maxLength'> & {
    /**
     * Pass to render a leading element
     */
    leadingAccessory?: ReactElement;
    /**
     * Pass to render a trailing element
     */
    trailingAccessory?: ReactElement;
    /**
     * Pass to add floating placeholder support
     */
    floatingPlaceholder?: boolean;
    /**
     * Custom style for the floating placeholder
     */
    floatingPlaceholderStyle?: TextStyle;
    /**
     * A single or multiple validator. Can be a string (required, email) or custom function.
     */
    validate?: Validator | Validator[];
    /**
     * Should validate when the TextField mounts
     */
    validateOnStart?: boolean;
    /**
     * Should validate when the TextField value changes
     */
    validateOnChange?: boolean;
    /**
     * Should validate when losing focus of TextField
     */
    validateOnBlur?: boolean;
    /**
     * Callback for when field validity has changed
     */
    onChangeValidity?: (isValid: boolean) => void;
    /**
     * The position of the validation message (top/bottom)
     */
    validationMessagePosition?: ValidationMessagePosition;
    /**
     * Internal style for the field container
     */
    fieldStyle?: ViewStyle | ((context: FieldContextType) => ViewStyle);
    /**
     * Container style of the whole component
     */
    containerStyle?: ViewStyle;
    /**
     * Predefined preset to use for styling the field
     */
    preset?: 'default' | undefined;
  };

export type InternalTextFieldProps = TextFieldProps &
  // Omit<FieldStateInjectedProps, keyof InputProps> &
  BaseComponentInjectedProps &
  ForwardRefInjectedProps;

interface StaticMembers {
  validationMessagePositions: typeof ValidationMessagePosition;
}

/**
 * @description: A controlled, customizable TextField with validation support
 * @extends: TextInput
 * @extendsLink: https://reactnative.dev/docs/textinput
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/incubatorScreens/IncubatorTextFieldScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Incubator.TextField/FloatingPlaceholder.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Incubator.TextField/Validation.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Incubator.TextField/ColorByState.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Incubator.TextField/CharCounter.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Incubator.TextField/Hint.gif?raw=true
 */
const TextField = (props: InternalTextFieldProps) => {
  const {
    modifiers,
    // General
    fieldStyle: fieldStyleProp,
    containerStyle,
    floatingPlaceholder,
    floatingPlaceholderColor,
    floatingPlaceholderStyle,
    floatOnFocus,
    hint,
    // Label
    label,
    labelColor,
    labelStyle,
    labelProps,
    // Accessory Buttons
    leadingAccessory,
    trailingAccessory,
    // Validation
    enableErrors, // TODO: rename to enableValidation
    validationMessage,
    validationMessageStyle,
    validationMessagePosition = ValidationMessagePosition.BOTTOM,
    // Char Counter
    showCharCounter,
    charCounterStyle,
    // Input
    placeholder,
    ...others
  } = usePreset(props);
  const {onFocus, onBlur, onChangeText, fieldState} = useFieldState(others);

  const context = useMemo(() => {
    return {...fieldState, disabled: others.editable === false};
  }, [fieldState, others.editable]);

  const {margins, paddings, typography, color} = modifiers;
  const typographyStyle = useMemo(() => omit(typography, 'lineHeight'), [typography]);
  const colorStyle = useMemo(() => color && {color}, [color]);

  const fieldStyle = isFunction(fieldStyleProp) ? fieldStyleProp(context) : fieldStyleProp;

  return (
    <FieldContext.Provider value={context}>
      <View style={[margins, containerStyle]}>
        <Label
          label={label}
          labelColor={labelColor}
          labelStyle={labelStyle}
          labelProps={labelProps}
          floatingPlaceholder={floatingPlaceholder}
          validationMessagePosition={validationMessagePosition}
        />
        {validationMessagePosition === ValidationMessagePosition.TOP && (
          <ValidationMessage
            enableErrors={enableErrors}
            validationMessage={validationMessage}
            validationMessageStyle={validationMessageStyle}
          />
        )}
        <View style={[paddings, fieldStyle]}>
          <View row centerV>
            {leadingAccessory}
            <View flex>
              {floatingPlaceholder && (
                <FloatingPlaceholder
                  placeholder={placeholder}
                  floatingPlaceholderStyle={[typographyStyle, floatingPlaceholderStyle]}
                  floatingPlaceholderColor={floatingPlaceholderColor}
                  floatOnFocus={floatOnFocus}
                  validationMessagePosition={validationMessagePosition}
                />
              )}
              <Input
                {...others}
                style={[typographyStyle, colorStyle, others.style]}
                onFocus={onFocus}
                onBlur={onBlur}
                onChangeText={onChangeText}
                placeholder={floatingPlaceholder ? undefined : placeholder}
                hint={hint}
              />
            </View>
            {trailingAccessory}
          </View>
        </View>
        <View row spread>
          {validationMessagePosition === ValidationMessagePosition.BOTTOM && (
            <ValidationMessage
              enableErrors={enableErrors}
              validationMessage={validationMessage}
              validationMessageStyle={validationMessageStyle}
              retainSpace
            />
          )}
          {showCharCounter && <CharCounter maxLength={others.maxLength} charCounterStyle={charCounterStyle}/>}
        </View>
      </View>
    </FieldContext.Provider>
  );
};

TextField.displayName = 'Incubator.TextField';
TextField.validationMessagePositions = ValidationMessagePosition;

export default asBaseComponent<TextFieldProps, StaticMembers>(forwardRef(TextField as any));
