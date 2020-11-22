import React from 'react';
import { ViewProps } from '../view';
import { PanLocationProps } from './panningProvider';
export interface PanResponderViewProps extends ViewProps {
    /**
     * Will be called with the current location ({left, top}) when the pan has ended
     */
    onPanLocationChanged?: (location: PanLocationProps) => void;
    /**
     * Ignore panning events while this is true
     */
    ignorePanning?: boolean;
    /**
     * Allow the view to be animated (send animation via style; default is false)
     */
    isAnimated?: boolean;
}
export declare type PanResponderViewPropTypes = PanResponderViewProps;
declare const _default: React.ComponentClass<PanResponderViewProps, any>;
export default _default;
