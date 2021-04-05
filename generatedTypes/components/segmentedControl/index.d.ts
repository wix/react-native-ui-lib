import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SegmentItemProps } from './segment';
export declare type SegmentedControlProps = {
    /**
     * Array on segments.
     */
    segments?: SegmentItemProps[];
    /**
     * The color of the active segment (label and outline).
     */
    activeColor?: string;
    /**
     * The color of the inactive segments (label).
     */
    inActiveColor?: string;
    /**
     * Callback for when index has change.
     */
    onChangeIndex?: (index: number) => void;
    /**
     * Initial index to be active.
     */
    initialIndex?: number;
    /**
     * The segmentedControl borderRadius
     */
    borderRadius?: number;
    /**
     * The background color of the inactive segments
     */
    backgroundColor?: string;
    /**
     * The background color of the active segment
     */
    activeBackgroundColor?: string;
    /**
     * The color of the segmentedControl outline
     */
    outlineColor?: string;
    /**
     * The width of the segments
     */
    outlineWidth?: number;
    /**
     * Should the icon be on right of the label
     */
    iconOnRight?: boolean;
    /**
     * Additional spacing styles for the container
     */
    containerStyle?: StyleProp<ViewStyle>;
    testID?: string;
};
declare const _default: React.ComponentClass<SegmentedControlProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
