import React, {Component} from 'react';
import {StyleSheet, YellowBox} from 'react-native';
import {Colors, View, Text, Incubator} from 'react-native-ui-lib'; //eslint-disable-line

YellowBox.ignoreWarnings(['Require cycle:']);

export default class PlaygroundScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View flex bg-dark80 padding-20 style={styles.container}>
        <Text>Unicorn Playground Screen</Text>

        <Incubator.TouchableOpacity
          backgroundColor={Colors.blue30}
          style={{padding: 5}}
          onPress={() => console.warn('ethan - Press button')}
        >
          <Text>BUTTOn</Text>
        </Incubator.TouchableOpacity>

        <Incubator.TabBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
