import React from 'react';
import { TouchableOpacityProps as RNTouchableOpacityProps } from 'react-native';
import { ContainerModifiers } from '../../commons/new';
export declare type TouchableOpacityProps = RNTouchableOpacityProps & ContainerModifiers & {
    /**
     * background color for TouchableOpacity
     */
    backgroundColor?: string;
    /**
     * throttle time in MS for onPress callback
     */
    throttleTime?: number;
    /**
     * throttle options {leading, trailing}
     */
    throttleOptions?: {
        leading: boolean;
        trailing: boolean;
    };
    /**
     * Apply background color on TouchableOpacity when active (press is on)
     */
    activeBackgroundColor?: string;
    /**
     * Should use a more native touchable opacity component
     */
    useNative?: boolean;
    ref?: any;
};
declare const _default: React.ComponentType<TouchableOpacityProps>;
export default _default;
