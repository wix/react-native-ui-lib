import React, {Component} from 'react';
import PanningContext from './panningContext';

export enum PanningDirectionsEnum {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}

export type PanningDirectionsUnion = 'up' | 'down' | 'left' | 'right';

export type PanningDirections = PanningDirectionsEnum | PanningDirectionsUnion;

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
  static displayName = 'IGNORE';
  static Directions = PanningDirectionsEnum;

  constructor(props: any) {
    super(props);

    this.state = {
      isPanning: false,
      wasTerminated: false,
      dragDirections: {},
      dragDeltas: {},
      swipeDirections: {},
      swipeVelocities: {},
      panLocation: {}
    };
  }

  getProviderContextValue = () => {
    const {
      isPanning,
      wasTerminated,
      dragDirections,
      dragDeltas,
      swipeDirections,
      swipeVelocities,
      panLocation
    } = this.state;

    return {
      onPanStart: this.onPanStart,
      onPanRelease: this.onPanRelease,
      onPanTerminated: this.onPanTerminated,
      isPanning,
      wasTerminated,
      onDrag: this.onDrag,
      dragDirections,
      dragDeltas,
      onSwipe: this.onSwipe,
      swipeDirections,
      swipeVelocities,
      onPanLocationChanged: this.onPanLocationChanged,
      panLocation
    };
  };

  onPanStart = () => {
    this.setState({isPanning: true, wasTerminated: false});
  };

  onPanRelease = () => {
    this.setState({isPanning: false});
  };

  onPanTerminated = () => {
    this.setState({isPanning: false, wasTerminated: true});
  };

  onDrag = ({directions, deltas}: {directions: PanDirectionsProps, deltas: PanAmountsProps}) => {
    this.setState({dragDirections: directions, dragDeltas: deltas, swipeDirections: {}, swipeVelocities: {}});
  };

  onSwipe = ({directions, velocities}: {directions: PanDirectionsProps, velocities: PanAmountsProps}) => {
    this.setState({swipeDirections: directions, swipeVelocities: velocities, dragDirections: {}, dragDeltas: {}});
  };

  onPanLocationChanged = (location: PanLocationProps) => {
    this.setState({panLocation: location});
  };

  render() {
    return (
      <PanningContext.Provider value={this.getProviderContextValue()}>{this.props.children}</PanningContext.Provider>
    );
  }
}
