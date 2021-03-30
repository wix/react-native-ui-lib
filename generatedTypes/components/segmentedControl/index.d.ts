import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export declare type SegmentedControlProps = {
    /**
     * Array on segment labels.
     */
    labels?: string[];
    /**
     * The color of the active segment.
     */
    color?: string;
    /**
     * Callback for when index has change.
     */
    onChangeIndex?: (index: number) => void;
    /**
     * Initial index to be active.
     */
    initialIndex?: number;
    style?: StyleProp<ViewStyle>;
    testID?: string;
};
declare const _default: React.ComponentClass<SegmentedControlProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
