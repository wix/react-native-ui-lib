import React from 'react';
import { TextInputProps, StyleProp, ViewStyle } from 'react-native';
export interface MaskedInputProps extends Omit<TextInputProps, 'value'> {
    /**
     * Initial value to pass to masked input
     */
    initialValue?: string;
    /**
     * callback for rendering the custom input out of the value returns from the actual input
     */
    renderMaskedText?: (value?: string) => JSX.Element | undefined;
    /**
     * Custom formatter for the input value
     */
    formatter?: (value?: string) => string | undefined;
    /**
     * container style for the masked input container
     */
    containerStyle?: StyleProp<ViewStyle>;
}
declare const _default: React.ForwardRefExoticComponent<MaskedInputProps & React.RefAttributes<any>>;
export default _default;
