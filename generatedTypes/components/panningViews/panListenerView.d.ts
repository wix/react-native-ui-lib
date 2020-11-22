import React from 'react';
import { PanningDirections, PanDirectionsProps, PanAmountsProps, PanningProviderDirection } from './panningProvider';
import { ViewProps } from '../view';
interface PanningProps {
    /**
     * This is were you will get notified when a drag occurs
     * onDrag = ({directions, deltas}) => {...}
     * directions - array of directions
     * deltas - array of deltas (same length and order as directions)
     * Both arrays will have {x, y} - if no x or y drag has occurred this value will be undefined
     */
    onDrag?: ({ directions, deltas }: ({
        directions: PanDirectionsProps;
        deltas: PanAmountsProps;
    })) => void;
    /**
     * This is were you will get notified when a swipe occurs
     * onSwipe = ({directions, velocities}) => {...}
     * directions - array of directions
     * velocities - array of velocities (same length and order as directions)
     * Both arrays will have {x, y} - if no x or y swipe has occurred this value will be undefined
     */
    onSwipe?: ({ directions, velocities }: ({
        directions: PanDirectionsProps;
        velocities: PanAmountsProps;
    })) => void;
    /**
     * This is were you will get notified when the pan starts
     */
    onPanStart?: () => void;
    /**
     * This is were you will get notified when the pan ends
     * The user has released all touches while this view is the responder.
     * This typically means a gesture has succeeded
     */
    onPanRelease?: () => void;
    /**
     * This is were you will get notified when the pan ends
     * Another component has become the responder,
     * so this gesture should be cancelled
     */
    onPanTerminated?: () => void;
}
export interface PanListenerViewProps extends PanningProps, ViewProps {
    /**
     * The directions of the allowed pan (default allows all directions)
     * Types: UP, DOWN, LEFT and RIGHT (using PanningProvider.Directions.###)
     */
    directions?: PanningDirections[] | PanningProviderDirection[];
    /**
     * The sensitivity beyond which a pan is no longer considered a single click (default is 5)
     */
    panSensitivity?: number;
    /**
     * The sensitivity beyond which a pan is no longer considered a drag, but a swipe (default is 1.8)
     * Note: a pan would have to occur (i.e. the panSensitivity has already been surpassed)
     */
    swipeVelocitySensitivity?: number;
    /**
     * Is there a view that is clickable (has onPress etc.) in the PanListenerView.
     * This can affect the panability of this component.
     */
    isClickable?: boolean;
}
export declare type PanListenerViewPropTypes = PanListenerViewProps;
declare const _default: React.ComponentClass<PanListenerViewProps, any>;
export default _default;
