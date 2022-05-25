/**
 * Known issues with React Native TextInput component
 * 1. iOS - input inner padding is off in multiline mode
 * 2. Android - input has minHeight that can't be overridden with zero padding (unlike iOS)
 * 3. Passing typography preset that includes lineHeight usually cause alignment issues with
 * other elements (leading/trailing accessories). It usually best to set lineHeight with undefined
 */
import React, {useMemo} from 'react';
import {isEmpty, trim, omit} from 'lodash';
import {asBaseComponent, forwardRef} from '../../commons/new';
import View from '../../components/view';
import {useMeasure} from '../../hooks';
import {TextFieldProps, InternalTextFieldProps, ValidationMessagePosition, FieldContextType, TextFieldMethods} from './types';
import {shouldHidePlaceholder} from './Presenter';
import Input from './Input';
import ValidationMessage from './ValidationMessage';
import Label from './Label';
import FieldContext from './FieldContext';
import useFieldState from './useFieldState';
import usePreset from './usePreset';
import FloatingPlaceholder from './FloatingPlaceholder';
import CharCounter from './CharCounter';

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
    dynamicFieldStyle,
    containerStyle,
    floatingPlaceholder,
    floatingPlaceholderColor,
    floatingPlaceholderStyle,
    floatOnFocus,
    placeholderTextColor,
    hint,
    // Label
    label,
    labelColor,
    labelStyle,
    labelProps,
    // Accessory Buttons
    leadingAccessory,
    trailingAccessory,
    bottomAccessory,
    // Validation
    enableErrors, // TODO: rename to enableValidation
    validationMessageStyle,
    validationMessagePosition = ValidationMessagePosition.BOTTOM,
    // Char Counter
    showCharCounter,
    charCounterStyle,
    // Input
    placeholder,
    children,
    ...others
  } = usePreset(props);
  const {ref: leadingAccessoryRef, measurements: leadingAccessoryMeasurements} = useMeasure();
  const {onFocus, onBlur, onChangeText, fieldState, validateField, checkValidity} = useFieldState(others);

  const context = useMemo(() => {
    return {...fieldState, disabled: others.editable === false, validateField, checkValidity};
  }, [fieldState, others.editable, validateField, checkValidity]);

  const leadingAccessoryClone = useMemo(() => {
    if (leadingAccessory) {
      return React.cloneElement(leadingAccessory, {
        ref: leadingAccessoryRef
      });
    }
  }, [leadingAccessory]);

  const {margins, paddings, typography, color} = modifiers;
  const typographyStyle = useMemo(() => omit(typography, 'lineHeight'), [typography]);
  const colorStyle = useMemo(() => color && {color}, [color]);

  const fieldStyle = [fieldStyleProp, dynamicFieldStyle?.(context, {preset: props.preset})];
  const hidePlaceholder = shouldHidePlaceholder(props, fieldState.isFocused);
  const retainTopMessageSpace = !floatingPlaceholder && isEmpty(trim(label));

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
          testID={`${props.testID}.label`}
        />
        {validationMessagePosition === ValidationMessagePosition.TOP && (
          <ValidationMessage
            enableErrors={enableErrors}
            validate={others.validate}
            validationMessage={others.validationMessage}
            validationMessageStyle={validationMessageStyle}
            retainSpace={retainTopMessageSpace}
            testID={`${props.testID}.validationMessage`}
          />
        )}
        <View style={[paddings, fieldStyle]} row centerV>
          {/* <View row centerV> */}
          {leadingAccessoryClone}
          <View flexG /* flex row */>
            {floatingPlaceholder && (
              <FloatingPlaceholder
                placeholder={placeholder}
                floatingPlaceholderStyle={[typographyStyle, floatingPlaceholderStyle]}
                floatingPlaceholderColor={floatingPlaceholderColor}
                floatOnFocus={floatOnFocus}
                validationMessagePosition={validationMessagePosition}
                extraOffset={leadingAccessoryMeasurements?.width}
                testID={`${props.testID}.floatingPlaceholder`}
              />
            )}
            {children || (
              <Input
                placeholderTextColor={hidePlaceholder ? 'transparent' : placeholderTextColor}
                {...others}
                style={[typographyStyle, colorStyle, others.style]}
                onFocus={onFocus}
                onBlur={onBlur}
                onChangeText={onChangeText}
                placeholder={placeholder}
                hint={hint}
              />
            )}
          </View>
          {trailingAccessory}
          {/* </View> */}
        </View>
        <View row spread>
          {validationMessagePosition === ValidationMessagePosition.BOTTOM && (
            <ValidationMessage
              enableErrors={enableErrors}
              validate={others.validate}
              validationMessage={others.validationMessage}
              validationMessageStyle={validationMessageStyle}
              retainSpace
              testID={`${props.testID}.validationMessage`}
            />
          )}
          {bottomAccessory}
          {showCharCounter && (
            <CharCounter
              maxLength={others.maxLength}
              charCounterStyle={charCounterStyle}
              testID={`${props.testID}.charCounter`}
            />
          )}
        </View>
      </View>
    </FieldContext.Provider>
  );
};

TextField.displayName = 'Incubator.TextField';
TextField.validationMessagePositions = ValidationMessagePosition;

export {TextFieldProps, FieldContextType, StaticMembers as TextFieldStaticMembers, TextFieldMethods};
export default asBaseComponent<TextFieldProps, StaticMembers>(forwardRef(TextField as any));
