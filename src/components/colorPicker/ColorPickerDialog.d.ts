import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { DialogProps } from '../../incubator/dialog';
export interface ColorPickerDialogProps extends DialogProps {
    /**
     * The initial color to pass the picker dialog
     */
    initialColor?: string;
    /**
     * onSubmit callback for the picker dialog color change
     */
    onSubmit?: (color: string, textColor: string) => void;
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
    /**
     * Whether to use the new Slider implementation using Reanimated
     */
    migrate?: boolean;
}
declare const _default: React.ForwardRefExoticComponent<ColorPickerDialogProps & React.RefAttributes<any>>;
export default _default;
