import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export declare type SegmentedControlProps = {
    /**
     * The label of the left segment.
     */
    leftLabel?: string;
    /**
     * The label of the right segment.
     */
    rightLabel?: string;
    /**
     * The color of the active segment.
     */
    color?: string;
    style?: StyleProp<ViewStyle>;
    testID?: string;
};
declare const _default: React.ComponentClass<SegmentedControlProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
