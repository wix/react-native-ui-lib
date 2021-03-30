import React from 'react';
import { LayoutChangeEvent } from 'react-native';
export declare type SegmentProps = {
    /**
     * The label of the segment.
     */
    label?: string;
    /**
     * Is the item selected.
     */
    isSelected?: boolean;
    /**
     * The color of the active segment.
     */
    color?: string;
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
declare const _default: React.ComponentClass<SegmentProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
