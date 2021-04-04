import React from 'react';
import { LayoutChangeEvent, ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';
export declare type SegmentItemProps = {
    /**
     * The title of the segment.
     */
    title?: string;
    /**
     * An icon for the segment.
     */
    iconSource?: ImageSourcePropType;
    /**
     * An icon for the segment.
     */
    iconStyle?: StyleProp<ImageStyle>;
};
export declare type SegmentProps = SegmentItemProps & {
    /**
     * Is the item selected.
     */
    isSelected?: boolean;
    /**
     * The color of the active segment.
     */
    activeColor?: string;
    unActiveColor?: string;
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
    segmentOnLayout?: (index: number, event: LayoutChangeEvent) => void;
};
declare const _default: React.ComponentClass<SegmentItemProps & {
    /**
     * Is the item selected.
     */
    isSelected?: boolean | undefined;
    /**
     * The color of the active segment.
     */
    activeColor?: string | undefined;
    unActiveColor?: string | undefined;
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
    segmentOnLayout?: ((index: number, event: LayoutChangeEvent) => void) | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
