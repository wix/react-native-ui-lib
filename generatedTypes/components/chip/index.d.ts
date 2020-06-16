import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
interface ChipProps {
    dismiss?: Function;
    label?: string;
    icon?: number;
    onPress?: Function;
    style?: StyleProp<ViewStyle>;
    /**
     * ChipItem's Background color.
     */
    backgroundColor?: string;
    /**
     * Selected ChipItem's background color.
     */
    selectedBackgroundColor?: string;
    /**
     * Color of the label.
     */
    labelColor?: string;
    /**
     * Selected chip's label color.
     */
    selectedLabelColor?: string;
    /**
     * Text to show to the right of the label or inside the Badge.
     */
    counterLabel?: string;
    /**
     * Color of the counter label.
     */
    counterColor?: string;
    /**
     * Color of the counter label when selected.
     */
    selectedCounterColor?: string;
    /**
     * Badge props object.
     */
    badge?: any;
    /**
     * Is the ChipItem selected.
     */
    selected?: string;
    /**
     * Outline color.
     */
    outlineColor?: string;
    /**
     * Selected outline color.
     */
    selectedOutlineColor?: string;
    textStyle?: object;
    dismissColor?: string;
    /**
     * Avatar object
     */
    avatar?: any;
}
declare const _default: React.ComponentType<ChipProps>;
export default _default;
