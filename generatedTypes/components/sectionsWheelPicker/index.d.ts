import React from 'react';
import { TextStyle } from 'react-native';
import { WheelPickerProps } from '../../incubator/WheelPicker';
export declare type SectionsWheelPickerProps = {
    /**
     * Array of sections.
     */
    sections?: WheelPickerProps[];
    /**
     * Describe the width of each section in the SectionsWheelPicker
     * default value: '33%'
     */
    sectionWidth?: string | number;
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
    testID?: string;
};
declare const _default: React.ComponentClass<SectionsWheelPickerProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
