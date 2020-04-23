import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { ContainerModifiers } from '../../commons/new';
declare type IProps = TouchableOpacityProps & ContainerModifiers & {
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
};
declare const _default: React.ComponentType<IProps>;
export default _default;
