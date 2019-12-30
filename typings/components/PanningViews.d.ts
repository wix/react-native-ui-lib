import {Component, PureComponent} from 'react';
import {BaseComponent, PureBaseComponent} from '../commons';

export type PanningProviderDirection = 'up' | 'down' | 'left' | 'right';

export interface PanDismissibleViewAnimationOptions {
  speed?: number;
  bounciness?: number;
  duration?: number;
}

export interface PanDismissibleViewProps {
  directions?: PanningProviderDirection[];
  onDismiss?: () => void;
  animationOptions?: PanDismissibleViewAnimationOptions;
}

export class PanDismissibleView extends PureComponent<PanDismissibleViewProps> {}

export type PanGestureViewDirection = 'up' | 'down';

export interface PanGestureViewProps {
  onDismiss?: () => void;
  direction?: PanGestureViewDirection;
}

export class PanGestureView extends BaseComponent<PanGestureViewProps> {}

export interface PanDragVelocity {
  x?: number;
  y?: number
}

export interface PanSwipeDelta {
  x?: number;
  y?: number
}

export interface PanListenerViewProps {
  directions?: PanningProviderDirection[];
  onDrag?: (directions: PanningProviderDirection[], velocities: PanDragVelocity[]) => void;
  onSwipe?: (directions: PanningProviderDirection[], deltas: PanSwipeDelta[]) => void;
  onPanStart?: () => void;
  onPanRelease?: () => void;
  onPanTerminated?: () => void;
  panSensitivity?: number;
  swipeVelocitySensitivity?: number
}

export class PanListenerView extends PureBaseComponent<PanListenerViewProps> {}

export interface PanLocationChange {
  left: number;
  top: number;
  initialLeft: number;
  initialTop: number;
}

export interface PanResponderViewProps {
  onPanLocationChanged?: (location: PanLocationChange) => void;
  ignorePanning?: boolean;
  isAnimated?: boolean;
}

export class PanResponderView extends PureComponent<PanResponderViewProps> {}

export class PanningProvider extends Component {}
