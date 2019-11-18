import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Colors, Incubator} from 'react-native-ui-lib'; //eslint-disable-line

export default class PlaygroundScreen extends Component {
  componentDidMount() {
    // this.slow(10);
  }

  slow(iterations = 10) {
    if (iterations === 0) {
      return;
    }

    setTimeout(() => {
      _.times(5000, () => {
        console.log('slow log');
      });

      this.slow(iterations - 1);
    }, 10);
  }

  render() {
    return (
      <View bg-dark80 flex center>
        <Incubator.TouchableOpacity
          onPress={() => console.warn('ethan - presss')}
          backgroundColor={Colors.blue40}
          feedbackColor={Colors.blue20}
          activeScale={0.95}
          style={{paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20}}
          activeOpacity={1}
        >
          <Text white>TEXT</Text>
        </Incubator.TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
