import React, { PropsWithChildren } from 'react';
import { TextStyle } from 'react-native';
import { WheelPickerProps, WheelPickerItemValue } from '../WheelPicker';
export type SectionsWheelPickerProps<T = WheelPickerItemValue> = PropsWithChildren<{
    /**
     * Array of sections.
     */
    sections?: WheelPickerProps<T>[];
    /**
     * Describe the height of each item in the WheelPicker
     * default value: 44
     */
    itemHeight?: number;
    /**
     * Describe the number of rows visible
     * default value: 5
     */
    numberOfVisibleRows?: number;
    /**
     * Text color for the focused row
     */
    activeTextColor?: string;
    /**
     * Text color for other, non-focused rows
     */
    inactiveTextColor?: string;
    /**
     * Row text style
     */
    textStyle?: TextStyle;
    disableRTL?: boolean;
    testID?: string;
}>;
/**
 * @description: SectionsWheelPicker component for presenting set of wheelPickers
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SectionsWheelPickerScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/SectionsWheelPicker/SectionsWheelPicker.gif?raw=true
 */
declare const SectionsWheelPicker: {
    <T extends WheelPickerItemValue>(props: SectionsWheelPickerProps<T>): React.JSX.Element;
    displayName: string;
};
export default SectionsWheelPicker;
