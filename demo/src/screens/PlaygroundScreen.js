import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Colors, Constants, View, Text, Button, Modal} from 'react-native-ui-lib'; //eslint-disable-line

export default class PlaygroundScreen extends Component {
  static id = 'example.Playground';

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View flex center style={styles.container}>
        <Text>Playground Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cyan60,
  },
});
