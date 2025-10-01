import React from 'react';
import { GestureResponderEvent, TouchableOpacityProps as RNTouchableOpacityProps } from 'react-native';
import { ContainerModifiers, BackgroundColorModifier } from '../../commons/new';
import { RecorderProps } from '../../typings/recorderTypes';
import { ViewProps } from '../view';
export interface TouchableOpacityProps extends Omit<RNTouchableOpacityProps, 'style' | 'onPress' | 'onPressIn' | 'onPressOut' | 'onLongPress'>, ContainerModifiers, BackgroundColorModifier, RecorderProps {
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
     * Will apply scale press feedback. This will enforce the useNative prop
     */
    activeScale?: number;
    /**
     * Should use a more native touchable opacity component
     */
    useNative?: boolean;
    /**
     * Custom value of any type to pass on to TouchableOpacity and receive back in onPress callback
     */
    customValue?: any;
    style?: ViewProps['style'];
    onPress?: (props?: (TouchableOpacityProps & {
        event: GestureResponderEvent;
    }) | any) => void;
    onPressIn?: (props?: TouchableOpacityProps | GestureResponderEvent | any) => void | RNTouchableOpacityProps['onPressIn'];
    onPressOut?: (props?: TouchableOpacityProps | GestureResponderEvent | any) => void | RNTouchableOpacityProps['onPressOut'];
    onLongPress?: (props?: (TouchableOpacityProps & {
        event: GestureResponderEvent;
    }) | any) => void | RNTouchableOpacityProps['onLongPress'];
    nativeID?: string;
}
declare const _default: React.ForwardRefExoticComponent<TouchableOpacityProps & React.RefAttributes<any>>;
export default _default;
