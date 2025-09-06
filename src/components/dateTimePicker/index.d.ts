import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { BaseComponentInjectedProps } from '../../commons/new';
import { TextFieldProps } from '../textField';
import type { DialogMigrationProps } from '../../incubator/dialog';
import { ButtonProps } from '../button';
import { OldApiProps } from './useOldApi';
export type DateTimePickerMode = 'date' | 'time';
export type DateTimePickerProps = OldApiProps & Omit<TextFieldProps, 'value' | 'onChange'> & DialogMigrationProps & {
    /**
     * The type of picker to display ('date' or 'time')
     */
    mode?: DateTimePickerMode;
    /**
     * The initial value to set the picker to. Defaults to device's date / time
     */
    value?: Date;
    /**
     * The onChange callback
     */
    onChange?: (date: Date) => void;
    /**
     * Should this input be editable or disabled
     */
    editable?: boolean;
    /**
     * The minimum date or time value to use
     */
    minimumDate?: Date;
    /**
     * The maximum date or time value to use
     */
    maximumDate?: Date;
    /**
     * A callback function to format the time or date
     * @param mode the type of the picker ('date' or 'time')
     * @returns the formatted string to display
     */
    dateTimeFormatter?: (value: Date, mode: DateTimePickerMode) => string;
    /**
     * Allows changing of the locale of the component (iOS only)
     */
    locale?: string;
    /**
     * Allows changing of the time picker to a 24 hour format (Android only)
     */
    is24Hour?: boolean;
    /**
     * The interval at which minutes can be selected. Possible values are: 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30 (iOS only)
     */
    minuteInterval?: number;
    /**
     * Allows changing of the timeZone of the date picker. By default it uses the device's time zone (iOS only)
     */
    timeZoneOffsetInMinutes?: number;
    /**
     * style to apply to the iOS dialog header
     */
    headerStyle?: StyleProp<ViewStyle>;
    /**
     * Render custom input
     */
    renderInput?: (props: Omit<DateTimePickerProps, 'value'> & {
        value?: string;
    }) => React.ReactElement;
    /**
     * Override system theme variant (dark or light mode) used by the date picker.
     */
    themeVariant?: 'light' | 'dark';
    /**
     * The component testID
     */
    testID?: string;
    /**
     * Allows changing the visual display of the picker
     */
    display?: string;
    /**
     * Text color of the wheel picker items
     */
    textColor?: string;
    /**
     * Background color of the wheel picker
     */
    backgroundColor?: string;
    /**
     * Confirm button props
     */
    confirmButtonProps?: ButtonProps;
    /**
     * Cancel button props
     */
    cancelButtonProps?: ButtonProps;
};
type DateTimePickerPropsInternal = DateTimePickerProps & BaseComponentInjectedProps;
/**
 * @description: Date and Time Picker Component that wraps RNDateTimePicker for date and time modes.
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/DateTimePickerScreen.tsx
 * @important: DateTimePicker uses a native library. You MUST add and link the native library to both iOS and Android projects.
 * @extends: TextField, react-native-community/datetimepicker
 * @extendsLink: https://github.com/react-native-community/react-native-datetimepicker#react-native-datetimepicker
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/DateTimePicker/DateTimePicker_iOS.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/DateTimePicker/DateTimePicker_Android.gif?raw=true
 */
declare const DateTimePicker: React.ForwardRefExoticComponent<DateTimePickerPropsInternal & React.RefAttributes<any>>;
export { DateTimePicker };
declare const _default: React.ForwardRefExoticComponent<DateTimePickerProps & React.RefAttributes<any>>;
export default _default;
