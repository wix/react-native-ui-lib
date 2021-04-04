import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SegmentItemProps } from './segment';
export declare type SegmentedControlProps = {
    /**
     * Array on segment labels.
     */
    labels?: SegmentItemProps[];
    /**
     * The color of the active segment.
     */
    activeColor?: string;
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
     * The background color of the segmentedControl
     */
    backgroundColor?: string;
    /**
     * The background color of the active segment
     */
    activeBackgroundColor?: string;
    unActiveColor?: string;
    outlineColor?: string;
    outlineWidth?: number;
    iconOnRight?: boolean;
    style?: StyleProp<ViewStyle>;
    testID?: string;
};
declare const _default: React.ComponentClass<SegmentedControlProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
