import React, { Component } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { BaseComponentInjectedProps } from '../../commons/new';
import { DialogProps } from '../dialog';
/**
 * @description: Date and Time Picker Component that wraps RNDateTimePicker for date and time modes.
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/DateTimePickerScreen.js
 * @important: DateTimePicker uses a native library. You MUST add and link the native library to both iOS and Android projects.
 * @extends: TextField, react-native-community/datetimepicker
 * @extendsLink: https://github.com/react-native-community/react-native-datetimepicker#react-native-datetimepicker
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/DateTimePicker/DateTimePicker_iOS.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/DateTimePicker/DateTimePicker_Android.gif?raw=true
 */
export interface DateTimePickerProps {
    /**
     * The type of picker to display ('date' or 'time')
     */
    mode?: 'date' | 'time';
    /**
     * The initial value to set the picker to. Defaults to device's date / time
     */
    value?: Date;
    /**
     * The onChange callback
     */
    onChange?: (date: Date) => void;
    /**
     * The minimum date or time value to use
     */
    minimumDate?: Date;
    /**
     * The maximum date or time value to use
     */
    maximumDate?: Date;
    /**
     * The date format for the text display
     */
    dateFormat?: string;
    /**
     * A callback function to format date
     */
    dateFormatter?: (date: Date) => string;
    /**
     * The time format for the text display
     */
    timeFormat?: string;
    /**
     * A callback function to format time
     */
    timeFormatter?: (date: Date) => string;
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
     * Props to pass the Dialog component
     */
    dialogProps?: DialogProps;
    /**
     * style to apply to the iOS dialog header
     */
    headerStyle?: StyleProp<ViewStyle>;
    /**
     * Render custom input
     */
    renderInput?: () => React.ReactElement;
    /**
     * Override system theme variant (dark or light mode) used by the date picker.
     */
    themeVariant?: 'light' | 'dark';
    /**
     * The component testID
     */
    testID?: string;
}
interface DateTimePickerState {
    showExpandableOverlay: boolean;
    prevValue?: Date;
    value?: Date;
}
declare type DateTimePickerPropsInternal = DateTimePickerProps & BaseComponentInjectedProps;
declare class DateTimePicker extends Component<DateTimePickerPropsInternal, DateTimePickerState> {
    static displayName: string;
    static defaultProps: {
        mode: string;
        enableErrors: boolean;
        validateOnBlur: boolean;
    };
    chosenDate?: Date;
    constructor(props: DateTimePickerPropsInternal);
    static getDerivedStateFromProps(nextProps: DateTimePickerProps, prevState: DateTimePickerState): {
        prevValue: Date | undefined;
        value: Date | undefined;
    } | null;
    handleChange: (event: any, date: Date) => void;
    toggleExpandableOverlay: (callback?: (() => void) | undefined) => void;
    onToggleExpandableModal: (value: boolean) => void;
    onDonePressed: () => void;
    getStringValue: () => string | undefined;
    renderExpandableOverlay: () => JSX.Element;
    renderHeader(): JSX.Element;
    renderDateTimePicker(): JSX.Element | null | undefined;
    renderExpandable: () => JSX.Element | null | undefined;
    render(): JSX.Element;
}
export { DateTimePicker };
declare const _default: React.ComponentClass<DateTimePickerProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
