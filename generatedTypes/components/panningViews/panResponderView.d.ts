import React from 'react';
import { ViewPropTypes } from '../view';
import { PanLocationProps } from './panningProvider';
export interface PanResponderViewPropTypes extends ViewPropTypes {
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
declare const _default: React.ComponentClass<PanResponderViewPropTypes, any>;
export default _default;
