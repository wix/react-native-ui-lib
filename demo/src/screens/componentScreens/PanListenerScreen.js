import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, PanListenerView} from 'react-native-ui-lib'; //eslint-disable-line

export default class PanListenerScreen extends Component {
  state = {
    locationText: '',
  };

  onDragListener = ({dragDirections, velocities}) => {
    this.setState({locationText: `Dragged: ${dragDirections}`});
  };

  onSwipeListener = ({swipeDirections, deltas}) => {
    this.setState({locationText: `Swiped: ${swipeDirections}`});
  };

  render() {
    const {locationText} = this.state;

    return (
      <View flex bg-dark80>
        <Text text50 margin-40>
          Pan Listener
        </Text>
        <PanListenerView
          bg-dark70
          centerV
          height={300}
          width="100%"
          // directions={[PanListenerView.directions.UP, PanListenerView.directions.DOWN]}
          onDragListener={this.onDragListener}
          onSwipeListener={this.onSwipeListener}
        >
          <Text text50 margin-40>Drag\swipe here</Text>
        </PanListenerView>
        <Text text50 margin-40>
          {locationText}
        </Text>
      </View>
    );
  }
}
