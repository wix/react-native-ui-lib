/**
 * Known issues with React Native TextInput component
 * 1. iOS - input inner padding is off in multiline mode
 * 2. Android - input has minHeight that can't be overridden with zero padding (unlike iOS)
 * 3. Passing typography preset that includes lineHeight usually cause alignment issues with
 * other elements (leading/trailing accessories). It usually best to set lineHeight with undefined
 */
import React, { ReactElement } from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { ForwardRefInjectedProps, BaseComponentInjectedProps, MarginModifiers, PaddingModifiers, TypographyModifiers, ColorsModifiers } from '../../commons/new';
import { ValidationMessagePosition, Validator } from './types';
import { InputProps } from './Input';
import { ValidationMessageProps } from './ValidationMessage';
import { LabelProps } from './Label';
import { FloatingPlaceholderProps } from './FloatingPlaceholder';
import { CharCounterProps } from './CharCounter';
export declare type TextFieldProps = MarginModifiers & PaddingModifiers & TypographyModifiers & ColorsModifiers & InputProps & LabelProps & FloatingPlaceholderProps & ValidationMessageProps & Omit<CharCounterProps, 'maxLength'> & {
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
    fieldStyle?: ViewStyle;
    /**
     * Container style of the whole component
     */
    containerStyle?: ViewStyle;
    /**
     * Predefined preset to use for styling the field
     */
    preset?: 'default' | undefined;
};
export declare type InternalTextFieldProps = TextFieldProps & BaseComponentInjectedProps & ForwardRefInjectedProps;
interface StaticMembers {
    validationMessagePositions: typeof ValidationMessagePosition;
}
declare const _default: React.ComponentClass<(Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & Partial<Record<"padding" | "paddingL" | "paddingT" | "paddingR" | "paddingB" | "paddingH" | "paddingV", boolean>> & import("../../commons/modifiers").CustomModifier & InputProps & LabelProps & FloatingPlaceholderProps & ValidationMessageProps & Pick<CharCounterProps, "showCharCounter" | "charCounterStyle"> & {
    /**
     * Pass to render a leading element
     */
    leadingAccessory?: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
    /**
     * Pass to render a trailing element
     */
    trailingAccessory?: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
    /**
     * Pass to add floating placeholder support
     */
    floatingPlaceholder?: boolean | undefined;
    /**
     * Custom style for the floating placeholder
     */
    floatingPlaceholderStyle?: TextStyle | undefined;
    /**
     * A single or multiple validator. Can be a string (required, email) or custom function.
     */
    validate?: "number" | Function | "required" | "email" | "url" | "price" | Validator[] | undefined;
    /**
     * Should validate when the TextField mounts
     */
    validateOnStart?: boolean | undefined;
    /**
     * Should validate when the TextField value changes
     */
    validateOnChange?: boolean | undefined;
    /**
     * Should validate when losing focus of TextField
     */
    validateOnBlur?: boolean | undefined;
    /**
     * Callback for when field validity has changed
     */
    onChangeValidity?: ((isValid: boolean) => void) | undefined;
    /**
     * The position of the validation message (top/bottom)
     */
    validationMessagePosition?: ValidationMessagePosition | undefined;
    /**
     * Internal style for the field container
     */
    fieldStyle?: ViewStyle | undefined;
    /**
     * Container style of the whole component
     */
    containerStyle?: ViewStyle | undefined;
    /**
     * Predefined preset to use for styling the field
     */
    preset?: "default" | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}) | (Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & Partial<Record<"padding" | "paddingL" | "paddingT" | "paddingR" | "paddingB" | "paddingH" | "paddingV", boolean>> & import("../../commons/modifiers").CustomModifier & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & InputProps & LabelProps & FloatingPlaceholderProps & ValidationMessageProps & Pick<CharCounterProps, "showCharCounter" | "charCounterStyle"> & {
    /**
     * Pass to render a leading element
     */
    leadingAccessory?: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
    /**
     * Pass to render a trailing element
     */
    trailingAccessory?: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
    /**
     * Pass to add floating placeholder support
     */
    floatingPlaceholder?: boolean | undefined;
    /**
     * Custom style for the floating placeholder
     */
    floatingPlaceholderStyle?: TextStyle | undefined;
    /**
     * A single or multiple validator. Can be a string (required, email) or custom function.
     */
    validate?: "number" | Function | "required" | "email" | "url" | "price" | Validator[] | undefined;
    /**
     * Should validate when the TextField mounts
     */
    validateOnStart?: boolean | undefined;
    /**
     * Should validate when the TextField value changes
     */
    validateOnChange?: boolean | undefined;
    /**
     * Should validate when losing focus of TextField
     */
    validateOnBlur?: boolean | undefined;
    /**
     * Callback for when field validity has changed
     */
    onChangeValidity?: ((isValid: boolean) => void) | undefined;
    /**
     * The position of the validation message (top/bottom)
     */
    validationMessagePosition?: ValidationMessagePosition | undefined;
    /**
     * Internal style for the field container
     */
    fieldStyle?: ViewStyle | undefined;
    /**
     * Container style of the whole component
     */
    containerStyle?: ViewStyle | undefined;
    /**
     * Predefined preset to use for styling the field
     */
    preset?: "default" | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}) | (Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & Partial<Record<"padding" | "paddingL" | "paddingT" | "paddingR" | "paddingB" | "paddingH" | "paddingV", boolean>> & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & import("../../commons/modifiers").CustomModifier & InputProps & LabelProps & FloatingPlaceholderProps & ValidationMessageProps & Pick<CharCounterProps, "showCharCounter" | "charCounterStyle"> & {
    /**
     * Pass to render a leading element
     */
    leadingAccessory?: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
    /**
     * Pass to render a trailing element
     */
    trailingAccessory?: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
    /**
     * Pass to add floating placeholder support
     */
    floatingPlaceholder?: boolean | undefined;
    /**
     * Custom style for the floating placeholder
     */
    floatingPlaceholderStyle?: TextStyle | undefined;
    /**
     * A single or multiple validator. Can be a string (required, email) or custom function.
     */
    validate?: "number" | Function | "required" | "email" | "url" | "price" | Validator[] | undefined;
    /**
     * Should validate when the TextField mounts
     */
    validateOnStart?: boolean | undefined;
    /**
     * Should validate when the TextField value changes
     */
    validateOnChange?: boolean | undefined;
    /**
     * Should validate when losing focus of TextField
     */
    validateOnBlur?: boolean | undefined;
    /**
     * Callback for when field validity has changed
     */
    onChangeValidity?: ((isValid: boolean) => void) | undefined;
    /**
     * The position of the validation message (top/bottom)
     */
    validationMessagePosition?: ValidationMessagePosition | undefined;
    /**
     * Internal style for the field container
     */
    fieldStyle?: ViewStyle | undefined;
    /**
     * Container style of the whole component
     */
    containerStyle?: ViewStyle | undefined;
    /**
     * Predefined preset to use for styling the field
     */
    preset?: "default" | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}) | (Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & Partial<Record<"padding" | "paddingL" | "paddingT" | "paddingR" | "paddingB" | "paddingH" | "paddingV", boolean>> & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & InputProps & LabelProps & FloatingPlaceholderProps & ValidationMessageProps & Pick<CharCounterProps, "showCharCounter" | "charCounterStyle"> & {
    /**
     * Pass to render a leading element
     */
    leadingAccessory?: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
    /**
     * Pass to render a trailing element
     */
    trailingAccessory?: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
    /**
     * Pass to add floating placeholder support
     */
    floatingPlaceholder?: boolean | undefined;
    /**
     * Custom style for the floating placeholder
     */
    floatingPlaceholderStyle?: TextStyle | undefined;
    /**
     * A single or multiple validator. Can be a string (required, email) or custom function.
     */
    validate?: "number" | Function | "required" | "email" | "url" | "price" | Validator[] | undefined;
    /**
     * Should validate when the TextField mounts
     */
    validateOnStart?: boolean | undefined;
    /**
     * Should validate when the TextField value changes
     */
    validateOnChange?: boolean | undefined;
    /**
     * Should validate when losing focus of TextField
     */
    validateOnBlur?: boolean | undefined;
    /**
     * Callback for when field validity has changed
     */
    onChangeValidity?: ((isValid: boolean) => void) | undefined;
    /**
     * The position of the validation message (top/bottom)
     */
    validationMessagePosition?: ValidationMessagePosition | undefined;
    /**
     * Internal style for the field container
     */
    fieldStyle?: ViewStyle | undefined;
    /**
     * Container style of the whole component
     */
    containerStyle?: ViewStyle | undefined;
    /**
     * Predefined preset to use for styling the field
     */
    preset?: "default" | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}), any> & StaticMembers;
export default _default;
