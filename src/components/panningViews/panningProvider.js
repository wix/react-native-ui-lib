import React, {Component} from 'react';
import PanningContext from './panningContext';

const DIRECTIONS = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right'
};

/**
 * @description: Wraps the panResponderView and panListenerView to provide a shared context
 */
export default class PanningProvider extends Component {
  static displayName = 'PanningProvider';
  static Directions = DIRECTIONS;

  constructor(props) {
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

  onDrag = ({directions, deltas}) => {
    this.setState({dragDirections: directions, dragDeltas: deltas, swipeDirections: {}, swipeVelocities: {}});
  };

  onSwipe = ({directions, velocities}) => {
    this.setState({swipeDirections: directions, swipeVelocities: velocities, dragDirections: {}, dragDeltas: {}});
  };

  onPanLocationChanged = location => {
    this.setState({panLocation: location});
  };

  render() {
    return (
      <PanningContext.Provider value={this.getProviderContextValue()}>{this.props.children}</PanningContext.Provider>
    );
  }
}
