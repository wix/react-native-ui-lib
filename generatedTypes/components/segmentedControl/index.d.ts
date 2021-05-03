import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SegmentedControlItemProps as SegmentProps } from './segment';
export declare type SegmentedControlItemProps = SegmentProps;
export declare type SegmentedControlProps = {
    /**
     * Array on segments.
     */
    segments?: SegmentedControlItemProps[];
    /**
     * The color of the active segment label.
     */
    activeColor?: string;
    /**
     * The color of the inactive segments (label).
     */
    inactiveColor?: string;
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
     * The color of the active segment outline
     */
    outlineColor?: string;
    /**
     * The width of the active segment outline
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
