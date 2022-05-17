import {StyleProp, TextInput, TextInputProps, TextStyle, ViewStyle} from 'react-native';
import formValidators from './validators';
import {
  MarginModifiers,
  PaddingModifiers,
  TypographyModifiers,
  ColorsModifiers,
  BaseComponentInjectedProps,
  ForwardRefInjectedProps
} from '../../commons/new';
import {TextProps} from '../../components/text';
import {PropsWithChildren, ReactElement} from 'react';

export type ColorType =
  | string
  | {
      default?: string;
      focus?: string;
      error?: string;
      disabled?: string;
    };

export enum ValidationMessagePosition {
  TOP = 'top',
  BOTTOM = 'bottom'
}

export type Validator = Function | keyof typeof formValidators;

export interface FieldStateProps extends InputProps {
  validateOnStart?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  /**
   * A single or multiple validator. Can be a string (required, email) or custom function.
   */
  validate?: Validator | Validator[];
  /**
   * The validation message to display when field is invalid (depends on validate)
   */
  validationMessage?: string | string[];
  /**
   * Callback for when field validity has changed
   */
  onChangeValidity?: (isValid: boolean) => void;
}

export interface LabelProps {
  /**
   * Field label
   */
  label?: string;
  /**
   * Field label color. Either a string or color by state map ({default, focus, error, disabled})
   */
  labelColor?: ColorType;
  /**
   * Custom style for the field label
   */
  labelStyle?: TextStyle;
  /**
   * Pass extra props to the label Text element
   */
  labelProps?: TextProps;
  validationMessagePosition?: ValidationMessagePosition;
  floatingPlaceholder?: boolean;
  testID?: string;
}

export interface FloatingPlaceholderProps {
  /**
   * The placeholder for the field
   */
  placeholder?: string;
  /**
   * The floating placeholder color
   */
  floatingPlaceholderColor?: ColorType;
  /**
   * Custom style to pass to the floating placeholder
   */
  floatingPlaceholderStyle?: StyleProp<TextStyle>;
  /**
   * Should placeholder float on focus or when start typing
   */
  floatOnFocus?: boolean;
  validationMessagePosition?: ValidationMessagePosition;
  extraOffset?: number;
  testID: string;
}

export interface ValidationMessageProps {
  /**
   * Should support showing validation error message
   */
  enableErrors?: boolean;
  /**
   * The validation message to display when field is invalid (depends on validate)
   */
  validationMessage?: string | string[];
  /**
   * Custom style for the validation message
   */
  validationMessageStyle?: TextStyle;
  retainSpace?: boolean;
  validate?: FieldStateProps['validate'];
  testID?: string;
}

export interface CharCounterProps {
  /**
   * Should show a character counter (works only with maxLength)
   */
  showCharCounter?: boolean;
  maxLength?: number;
  /**
   * Pass custom style to character counter text
   */
  charCounterStyle?: TextStyle;
  testID: string;
}

export interface InputProps
  extends Omit<TextInputProps, 'placeholderTextColor'>,
    Omit<React.ComponentPropsWithRef<typeof TextInput>, 'placeholderTextColor'> {
  /**
   * A hint text to display when focusing the field
   */
  hint?: string;
  /**
   * Input color
   */
  color?: ColorType;
  /**
   * placeholder text color
   */
  placeholderTextColor?: ColorType;
  /**
   * Custom formatter for the input value (used only when input if not focused)
   */
  formatter?: (value?: string) => string | undefined;
}

export type TextFieldProps = MarginModifiers &
  PaddingModifiers &
  TypographyModifiers &
  ColorsModifiers &
  InputProps &
  LabelProps &
  Omit<FloatingPlaceholderProps, 'testID'> &
  // We're declaring these props explicitly here for react-docgen (which can't read hooks)
  // FieldStateProps &
  ValidationMessageProps &
  Omit<CharCounterProps, 'maxLength' | 'testID'> & {
    /**
     * Pass to render a leading element
     */
    leadingAccessory?: ReactElement;
    /**
     * Pass to render a trailing element
     */
    trailingAccessory?: ReactElement;
    /**
     * Pass to render a bottom element below the input
     */
    bottomAccessory?: ReactElement;
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
    fieldStyle?: StyleProp<ViewStyle>;
    /**
     * Internal dynamic style callback for the field container
     */
    dynamicFieldStyle?: (context: FieldContextType, props: {preset: TextFieldProps['preset']}) => StyleProp<ViewStyle>;
    /**
     * Container style of the whole component
     */
    containerStyle?: ViewStyle;
    /**
     * Predefined preset to use for styling the field
     */
    preset?: 'default' | null | string;
  };

export type InternalTextFieldProps = PropsWithChildren<
  TextFieldProps & BaseComponentInjectedProps & ForwardRefInjectedProps
>;

export type FieldContextType = {
  value?: string;
  isFocused: boolean;
  hasValue: boolean;
  isValid: boolean;
  failingValidatorIndex?: number;
  disabled: boolean;
  validateField: () => void;
  checkValidity: () => boolean;
};

export interface TextFieldMethods {
  isFocused: () => void;
  focus: () => void;
  blur: () => void;
  clear: () => void;
  validate: () => boolean;
  isValid: () => boolean;
}
