import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { TextFieldProps } from '../textField';
import { NumberInputData } from './Presenter';
export { NumberInputData };
type _TextFieldProps = Omit<TextFieldProps, 'leadingAccessory' | 'trailingAccessory' | 'value' | 'onChangeText' | 'placeholder' | 'placeholderTextColor' | 'floatingPlaceholder' | 'floatingPlaceholderColor' | 'floatingPlaceholderStyle' | 'contextMenuHidden'>;
type _NumberInputProps = {
    /**
     * Pass additional props to the TextField
     */
    textFieldProps?: _TextFieldProps;
    /**
     * Callback that is called when the number value has changed (undefined in both if the user has deleted the number).
     */
    onChangeNumber: (data: NumberInputData) => void;
    /**
     * A valid number (in en locale, i.e. only digits and a decimal point).
     */
    initialNumber?: number;
    /**
     * Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
     */
    fractionDigits?: number;
    /**
     * The locale to show the number (default 'en')
     * IMPORTANT: this might not work, depending on your intl\RN version\hermes configuration
     */
    /**
     * A leading text
     */
    leadingText?: string;
    /**
     * The style of the leading text
     */
    leadingTextStyle?: StyleProp<TextStyle>;
    /**
     * A trailing text
     */
    trailingText?: string;
    /**
     * The style of the trailing text
     */
    trailingTextStyle?: StyleProp<TextStyle>;
    /**
     * Container style of the whole component
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * If true, context menu is hidden. The default value is true.
     * Requires @react-native-community/clipboard to be installed.
     */
    contextMenuHidden?: boolean;
    testID?: string;
};
export type NumberInputProps = React.PropsWithRef<_NumberInputProps>;
declare const _default: React.ForwardRefExoticComponent<_NumberInputProps & React.RefAttributes<TextFieldProps>>;
export default _default;
