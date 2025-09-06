import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { SegmentedControlItemProps } from './segment';
import { TextProps } from '../text';
export declare enum SegmentedControlPreset {
    DEFAULT = "default",
    FORM = "form"
}
export { SegmentedControlItemProps };
export type SegmentedControlProps = {
    /**
     * Array on segments.
     */
    segments: SegmentedControlItemProps[];
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
     * Trailing throttle time of changing index in ms.
     */
    throttleTime?: number;
    /**
     * Additional style for the segment
     */
    segmentsStyle?: StyleProp<ViewStyle>;
    /**
     * Segment label style
     */
    segmentLabelStyle?: StyleProp<TextStyle>;
    /**
     * Additional spacing styles for the container
     */
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    testID?: string;
    /**
     * Preset type
     */
    preset?: SegmentedControlPreset | `${SegmentedControlPreset}`;
    /**
     * SegmentedControl label
     */
    label?: string;
    /**
     * Pass props for the SegmentedControl label
     */
    labelProps?: TextProps;
};
interface StaticMembers {
    presets: typeof SegmentedControlPreset;
}
declare const _default: React.ForwardRefExoticComponent<SegmentedControlProps & React.RefAttributes<any>> & StaticMembers;
export default _default;
