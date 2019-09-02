import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, PanListenerView, PanningProvider} from 'react-native-ui-lib'; //eslint-disable-line

export default class PanListenerScreen extends Component {
  state = {
    locationText: '',
    endType: ''
  };

  onDrag = ({directions, deltas}) => {
    this.setState({locationText: `Dragged: ${directions.x}, ${directions.y}`});
  };

  onSwipe = ({directions, velocities}) => {
    this.setState({locationText: `Swiped: ${directions.x}, ${directions.y}`});
  };

  onPanStart = () => {
    this.setState({endType: 'Panning'});
  };

  onPanRelease = () => {
    this.setState({endType: 'Released'});
  };

  onPanTerminated = () => {
    this.setState({endType: 'Terminated'});
  };

  render() {
    const {locationText, endType} = this.state;

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
        //   directions={[PanningProvider.Directions.UP, PanningProvider.Directions.DOWN]}
          onDrag={this.onDrag}
          onSwipe={this.onSwipe}
          onPanStart={this.onPanStart}
          onPanRelease={this.onPanRelease}
          onPanTerminated={this.onPanTerminated}
        >
          <Text text50 margin-40>Drag\swipe here</Text>
        </PanListenerView>
        <Text text50 margin-40>
          {locationText}
        </Text>
        <Text text50 margin-40>
          {endType}
        </Text>
      </View>
    );
  }
}
