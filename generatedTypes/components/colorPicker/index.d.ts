import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ColorPickerDialogProps } from './ColorPickerDialog';
interface Props extends ColorPickerDialogProps {
    /**
     * Array of colors for the picker's color palette (hex values)
     */
    colors: string[];
    /**
     * The value of the selected swatch // TODO: rename prop 'selectedValue'
     */
    value?: string;
    /**
     * The index of the item to animate at first render (default is last)
     */
    animatedIndex?: number;
    /**
     * onValueChange callback for the picker's color palette change
     */
    onValueChange?: (value: string, options: object) => void;
    /**
     * Accessibility labels as an object of strings, ex.
     * {
     *  addButton: 'add custom color using hex code',
     *  dismissButton: 'dismiss',
     *  doneButton: 'done',
     *  input: 'custom hex color code'
     * }
     */
    accessibilityLabels: {
        addButton?: string;
        dismissButton?: string;
        doneButton?: string;
        input?: string;
    };
    style?: StyleProp<ViewStyle>;
    testID?: string;
}
export declare type ColorPickerProps = Props;
declare const _default: React.ComponentClass<Props & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
