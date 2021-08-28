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
    direction?: GestureDirections;
}
declare const _default: React.ComponentClass<PanGestureViewProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
