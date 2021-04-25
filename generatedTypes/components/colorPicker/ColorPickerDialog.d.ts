import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { DialogProps } from '../dialog';
interface Props extends DialogProps {
    /**
     * The initial color to pass the picker dialog
     */
    initialColor?: string;
    /**
     * onSubmit callback for the picker dialog color change
     */
    onSubmit?: () => void;
    /**
     * Props to pass the Dialog component // TODO: deprecate 'dialogProps' prop
     */
    dialogProps?: object;
    /**
     * Additional styling for the color preview text.
     */
    previewInputStyle?: StyleProp<ViewStyle>;
    /**
     * Accessibility labels as an object of strings, ex. {addButton: 'add custom color using hex code', dismissButton: 'dismiss', doneButton: 'done', input: 'custom hex color code'}
     */
    /**
     * Ok (v) button color
     */
    doneButtonColor?: string;
    accessibilityLabels?: {
        dismissButton?: string;
        doneButton?: string;
        input?: string;
    };
}
export declare type ColorPickerDialogProps = Props;
declare const _default: React.ComponentClass<Props & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
