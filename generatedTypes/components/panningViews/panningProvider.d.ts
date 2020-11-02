import { Component } from 'react';
/**
 * @deprecated Please transition to PanningDirections
 */
export declare type PanningProviderDirection = 'up' | 'down' | 'left' | 'right';
export declare enum PanningDirections {
    UP = "up",
    DOWN = "down",
    LEFT = "left",
    RIGHT = "right"
}
export interface PanLocationProps {
    left?: number;
    top?: number;
}
export interface PanDirectionsProps {
    x?: PanningDirections | PanningProviderDirection;
    y?: PanningDirections | PanningProviderDirection;
}
export interface PanAmountsProps {
    x?: number;
    y?: number;
}
interface State {
    isPanning: boolean;
    wasTerminated: boolean;
    dragDirections: PanDirectionsProps;
    dragDeltas: PanAmountsProps;
    swipeDirections: PanDirectionsProps;
    swipeVelocities: PanAmountsProps;
    panLocation: PanLocationProps;
}
/**
 * @description: Wraps the panResponderView and panListenerView to provide a shared context
 */
export default class PanningProvider extends Component<{}, State> {
    static displayName: string;
    static Directions: typeof PanningDirections;
    constructor(props: {});
    getProviderContextValue: () => {
        onPanStart: () => void;
        onPanRelease: () => void;
        onPanTerminated: () => void;
        isPanning: boolean;
        wasTerminated: boolean;
        onDrag: ({ directions, deltas }: {
            directions: PanDirectionsProps;
            deltas: PanAmountsProps;
        }) => void;
        dragDirections: PanDirectionsProps;
        dragDeltas: PanAmountsProps;
        onSwipe: ({ directions, velocities }: {
            directions: PanDirectionsProps;
            velocities: PanAmountsProps;
        }) => void;
        swipeDirections: PanDirectionsProps;
        swipeVelocities: PanAmountsProps;
        onPanLocationChanged: (location: PanLocationProps) => void;
        panLocation: PanLocationProps;
    };
    onPanStart: () => void;
    onPanRelease: () => void;
    onPanTerminated: () => void;
    onDrag: ({ directions, deltas }: {
        directions: PanDirectionsProps;
        deltas: PanAmountsProps;
    }) => void;
    onSwipe: ({ directions, velocities }: {
        directions: PanDirectionsProps;
        velocities: PanAmountsProps;
    }) => void;
    onPanLocationChanged: (location: PanLocationProps) => void;
    render(): JSX.Element;
}
export {};
