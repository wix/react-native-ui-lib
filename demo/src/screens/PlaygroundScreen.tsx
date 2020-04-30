import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Card,} from 'react-native-ui-lib'; //eslint-disable-line

export default class PlaygroundScreen extends Component {
  render() {
    return (
      <View center bg-dark80 flex>
        <Card height={100} center padding-20>
          <Text text50>Playground Screen</Text>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
