import React, {Component} from 'react';
import {TouchableOpacity, ScrollView, Platform, StyleSheet} from 'react-native';
import {Colors, View, Text, PanListenerView} from 'react-native-ui-lib'; //eslint-disable-line

export default class PlaygroundScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationText: '',
    };
  }

  componentDidMount() {}

  onDragListener = (dragDirections) => {
    this.setState({locationText: `Dragged: ${dragDirections}`});
  };

  onSwipeListener = (swipeDirections) => {
    this.setState({locationText: `Swiped: ${swipeDirections}`});
  };

  render() {
    const {locationText} = this.state;

    return (
      <View flex bg-dark80 center style={styles.container}>
        <Text>Unicorn Playground Screen</Text>
        <PanListenerView
          bg-red30
          height={300}
          width="100%"
          // directions={[PanListenerView.directions.UP, PanListenerView.directions.DOWN]}
          onDragListener={this.onDragListener}
          onSwipeListener={this.onSwipeListener}
        />
        <Text>{locationText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
