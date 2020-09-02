import React, {Component} from 'react';
import PanningContext from './panningContext';

// TODO: rename DIRECTIONS -> Directions & Directions -> directions
export enum DIRECTIONS {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}

export interface Location {
  left?: number;
  top?: number;
}

export interface DirectionsProps {
  x?: DIRECTIONS;
  y?: DIRECTIONS;
}

export interface AmountsProps {
  x?: number;
  y?: number;
}

interface State {
  isPanning: boolean;
  wasTerminated: boolean;
  dragDirections: DirectionsProps;
  dragDeltas: AmountsProps;
  swipeDirections: DirectionsProps;
  swipeVelocities: AmountsProps;
  panLocation: Location;
}

/**
 * @description: Wraps the panResponderView and panListenerView to provide a shared context
 */
export default class PanningProvider extends Component<{}, State> {
  static displayName = 'PanningProvider';
  static Directions = DIRECTIONS;

  constructor(props: {}) {
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

  onDrag = ({directions, deltas}: {directions: DirectionsProps, deltas: AmountsProps}) => {
    this.setState({dragDirections: directions, dragDeltas: deltas, swipeDirections: {}, swipeVelocities: {}});
  };

  onSwipe = ({directions, velocities}: {directions: DirectionsProps, velocities: AmountsProps}) => {
    this.setState({swipeDirections: directions, swipeVelocities: velocities, dragDirections: {}, dragDeltas: {}});
  };

  onPanLocationChanged = (location: Location) => {
    this.setState({panLocation: location});
  };

  render() {
    return (
      <PanningContext.Provider value={this.getProviderContextValue()}>{this.props.children}</PanningContext.Provider>
    );
  }
}
