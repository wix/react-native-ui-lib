import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export declare enum GestureDirections {
    UP = "up",
    DOWN = "down"
}
export interface PanGestureViewProps {
    /**
     * Additional styling
     */
    style?: StyleProp<ViewStyle>;
    /**
     * onDismiss callback
     */
    onDismiss?: () => void;
    /**
     * The direction of the allowed pan (default is down)
     */
    direction?: GestureDirections | `${GestureDirections}`;
    children?: React.ReactNode;
}
declare const _default: React.ForwardRefExoticComponent<PanGestureViewProps & React.RefAttributes<any>>;
export default _default;
