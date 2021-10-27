import React from 'react';
import { LayoutChangeEvent, ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';
import Reanimated from 'react-native-reanimated';
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
     * Shared value of the current selected index.
     */
    selectedIndex?: Reanimated.SharedValue<number>;
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
    onPress?: (index: number) => void;
    /**
     * The index of the segment.
     */
    index: number;
    /**
     * onLayout function.
     */
    onLayout?: (index: number, event: LayoutChangeEvent) => void;
    testID?: string;
};
declare const _default: React.ComponentClass<SegmentedControlItemProps & {
    /**
     * Shared value of the current selected index.
     */
    selectedIndex?: Reanimated.SharedValue<number> | undefined;
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
    onPress?: ((index: number) => void) | undefined;
    /**
     * The index of the segment.
     */
    index: number;
    /**
     * onLayout function.
     */
    onLayout?: ((index: number, event: LayoutChangeEvent) => void) | undefined;
    testID?: string | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
