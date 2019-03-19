import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Colors, View, Text} from 'react-native-ui-lib'; //eslint-disable-line

export default class PlaygroundScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View flex bg-dark80 center style={styles.container}>
        <Text>Unicorn Playground Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});
