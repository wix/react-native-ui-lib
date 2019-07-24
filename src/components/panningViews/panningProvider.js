import React, {Component} from 'react';
import PanningContext from './panningContext';

const DIRECTIONS = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
};

export default class PanningProvider extends Component {
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
    };
  }

  getProviderContextValue = () => {
    const {isPanning, wasTerminated, dragDirections, dragDeltas, swipeDirections, swipeVelocities} = this.state;

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

  render() {
    return (
      <PanningContext.Provider value={this.getProviderContextValue()}>{this.props.children}</PanningContext.Provider>
    );
  }
}
