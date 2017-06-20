import React, {Component} from 'react';
import {View, Text, LoaderScreen, Colors} from 'react-native-ui-lib';//eslint-disable-line

export default class LoadingScreen extends Component {

  render() {
    return (
      <View flex bg-orange70 center>
        <Text text10>
          Content Content Content
        </Text>
        <LoaderScreen
          color={Colors.blue60}
          message="Loading..."
          overlay
        />
      </View>
    );
  }
}
