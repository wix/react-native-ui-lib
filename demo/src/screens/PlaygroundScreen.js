import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Colors, Constants, View, Text, Button, Modal, Badge} from 'react-native-ui-lib'; //eslint-disable-line

export default class PlaygroundScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const Container = Badge;

    return (
      <View flex center style={styles.container}>
        <Badge>Unicorn Playground Screen</Badge>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark80,
  },
});
