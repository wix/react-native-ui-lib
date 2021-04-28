import React from 'react';
import { LayoutChangeEvent, ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';
export declare type SegmentedControlItemProps = {
    /**
     * The label of the segment.
     */
    label?: string;
    /**
     * An icon for the segment.
     */
    iconSource?: ImageSourcePropType;
    /**
     * An icon for the segment.
     */
    iconStyle?: StyleProp<ImageStyle>;
    /**
     * Should the icon be on right of the label
     */
    iconOnRight?: boolean;
};
export declare type SegmentProps = SegmentedControlItemProps & {
    /**
     * Is the item selected.
     */
    isSelected?: boolean;
    /**
     * The color of the active segment (label and outline).
     */
    activeColor?: string;
    /**
     * The color of the inactive segment (label).
     */
    inactiveColor?: string;
    /**
     * Callback for when segment has pressed.
     */
    onPress: (index: number) => void;
    /**
     * The index of the segment.
     */
    index: number;
    /**
     * onLayout function.
     */
    onLayout?: (index: number, event: LayoutChangeEvent) => void;
};
declare const _default: React.ComponentClass<SegmentedControlItemProps & {
    /**
     * Is the item selected.
     */
    isSelected?: boolean | undefined;
    /**
     * The color of the active segment (label and outline).
     */
    activeColor?: string | undefined;
    /**
     * The color of the inactive segment (label).
     */
    inactiveColor?: string | undefined;
    /**
     * Callback for when segment has pressed.
     */
    onPress: (index: number) => void;
    /**
     * The index of the segment.
     */
    index: number;
    /**
     * onLayout function.
     */
    onLayout?: ((index: number, event: LayoutChangeEvent) => void) | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
