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
import {TextProps} from '../text';
import {RecorderProps} from '../../typings/recorderTypes';
import {PropsWithChildren, ReactElement} from 'react';
import {ViewProps} from '../view';

export type ColorType =
  | string
  | {
      default?: string;
      focus?: string;
      error?: string;
      disabled?: string;
      readonly?: string;
    };

export enum ValidationMessagePosition {
  TOP = 'top',
  BOTTOM = 'bottom'
}

export type ValidationMessagePositionType = `${ValidationMessagePosition}` | ValidationMessagePosition;

export type Validator = Function | keyof typeof formValidators;

interface FieldValidationProps {
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
   * Callback for when field validated and failed
   */
  onValidationFailed?: (failedValidatorIndex: number) => void;
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
  /**
   * The position of the validation message (top/bottom)
   */
  validationMessagePosition?: ValidationMessagePositionType;
  /**
   * Should support showing validation error message
   */
  enableErrors?: boolean; // TODO: rename to enableValidation
}

export interface FieldStateProps extends InputProps, FieldValidationProps {}

export interface MandatoryIndication {
  /**
   * Whether to show a mandatory field indication.
   */
  showMandatoryIndication?: boolean;
}

export interface LabelProps extends MandatoryIndication, Pick<FieldValidationProps, 'validationMessagePosition'> {
  /**
   * Field label
   */
  label?: string;
  /**
   * Field label color. Either a string or color by state map ({default, focus, error, disabled, readonly})
   */
  labelColor?: ColorType;
  /**
   * Custom style for the field label
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Pass extra props to the label Text element
   */
  labelProps?: TextProps;
  floatingPlaceholder?: boolean;
  testID?: string;
}

export interface FloatingPlaceholderProps extends MandatoryIndication {
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
  validationMessagePosition?: ValidationMessagePositionType;
  extraOffset?: number;
  defaultValue?: TextInputProps['defaultValue'];
  testID: string;
}

export interface ValidationMessageProps
  extends Pick<FieldValidationProps, 'validate' | 'validationMessage' | 'enableErrors'> {
  /**
   * Custom style for the validation message
   */
  validationMessageStyle?: StyleProp<TextStyle>;
  /**
   * Keep the validation space even if there is no validation message
   */
  retainValidationSpace?: boolean;
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
    MandatoryIndication,
    RecorderProps {
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
   * Custom formatter for the input value (used only when input is not focused)
   */
  formatter?: (value?: string) => string | undefined;
  /**
   * Use react-native-gesture-handler instead of react-native for the base TextInput
   */
  useGestureHandlerInput?: boolean;
  /**
   * A UI preset for read only state
   */
  readonly?: boolean;
}

export type TextFieldProps = InputProps &
  FieldValidationProps &
  LabelProps &
  Omit<FloatingPlaceholderProps, 'testID'> &
  ValidationMessageProps &
  Omit<CharCounterProps, 'maxLength' | 'testID'> &
  MarginModifiers &
  PaddingModifiers &
  TypographyModifiers &
  ColorsModifiers & {
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
     * Internal style for the field container
     */
    fieldStyle?: StyleProp<ViewStyle>;
    /**
     * Internal dynamic style callback for the field container
     */
    dynamicFieldStyle?: (context: FieldContextType, props: {preset: TextFieldProps['preset']}) => StyleProp<ViewStyle>;
    /**
     * Pass props to the container
     */
    containerProps?: Omit<ViewProps, 'style'>;
    /**
     * Container style of the whole component
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Predefined preset to use for styling the field
     */
    preset?: 'default' | null | string;
    /**
     * Whether to center the TextField - container and label
     */
    centered?: boolean;
    /**
     * @deprecated
     * Set an alignment fit for inline behavior (when rendered inside a row container)
     */
    inline?: boolean;
  };

export type InternalTextFieldProps = PropsWithChildren<
  TextFieldProps & BaseComponentInjectedProps & ForwardRefInjectedProps
>;

export type FieldContextType = Pick<FieldValidationProps, 'enableErrors'> & {
  value?: string;
  isFocused: boolean;
  hasValue: boolean;
  isValid: boolean;
  failingValidatorIndex?: number;
  disabled: boolean;
  readonly: boolean;
  validateField: () => void;
  checkValidity: () => boolean;
  isMandatory: boolean;
};

export interface TextFieldMethods {
  isFocused: () => void;
  focus: () => void;
  blur: () => void;
  clear: () => void;
  validate: () => boolean;
  isValid: () => boolean;
}

export type TextFieldRef = TextInput & TextFieldMethods;
