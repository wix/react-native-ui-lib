import React from 'react';
import { StyleProp, ViewStyle, ColorValue } from 'react-native';
import { TouchableOpacityProps } from '../touchableOpacity';
export type SwitchProps = TouchableOpacityProps & {
    /**
     * The value of the switch. If true the switch will be turned on. Default value is false
     */
    value?: boolean;
    /**
     * Invoked with the new value when the value changes
     */
    onValueChange?: (value: boolean) => void;
    /**
     * Whether the switch should be disabled
     */
    disabled?: boolean;
    /**
     * The Switch width
     */
    width?: number;
    /**
     * The Switch height
     */
    height?: number;
    /**
     * The Switch background color when it's turned on
     */
    onColor?: ColorValue;
    /**
     * The Switch background color when it's turned off
     */
    offColor?: ColorValue;
    /**
     * The Switch background color when it's disabled
     */
    disabledColor?: ColorValue;
    /**
     * The Switch's thumb color
     */
    thumbColor?: ColorValue;
    /**
     * The Switch's thumb size (width & height)
     */
    thumbSize?: number;
    /**
     * The Switch's thumb style
     */
    thumbStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    testID?: string;
    id?: string;
};
declare const _default: React.ForwardRefExoticComponent<TouchableOpacityProps & {
    /**
     * The value of the switch. If true the switch will be turned on. Default value is false
     */
    value?: boolean | undefined;
    /**
     * Invoked with the new value when the value changes
     */
    onValueChange?: ((value: boolean) => void) | undefined;
    /**
     * Whether the switch should be disabled
     */
    disabled?: boolean | undefined;
    /**
     * The Switch width
     */
    width?: number | undefined;
    /**
     * The Switch height
     */
    height?: number | undefined;
    /**
     * The Switch background color when it's turned on
     */
    onColor?: ColorValue | undefined;
    /**
     * The Switch background color when it's turned off
     */
    offColor?: ColorValue | undefined;
    /**
     * The Switch background color when it's disabled
     */
    disabledColor?: ColorValue | undefined;
    /**
     * The Switch's thumb color
     */
    thumbColor?: ColorValue | undefined;
    /**
     * The Switch's thumb size (width & height)
     */
    thumbSize?: number | undefined;
    /**
     * The Switch's thumb style
     */
    thumbStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    testID?: string | undefined;
    id?: string | undefined;
} & React.RefAttributes<any>>;
export default _default;
