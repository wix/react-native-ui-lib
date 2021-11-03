import { Component } from 'react';
export declare enum PanningDirectionsEnum {
    UP = "up",
    DOWN = "down",
    LEFT = "left",
    RIGHT = "right"
}
export declare type PanningDirectionsUnion = 'up' | 'down' | 'left' | 'right';
export declare type PanningDirections = PanningDirectionsEnum | PanningDirectionsUnion;
export interface PanLocationProps {
    left?: number;
    top?: number;
}
export interface PanDirectionsProps {
    x?: PanningDirections;
    y?: PanningDirections;
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
export default class PanningProvider extends Component<any, State> {
    static displayName: string;
    static Directions: typeof PanningDirectionsEnum;
    constructor(props: any);
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
