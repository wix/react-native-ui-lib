import React, {Component} from 'react';
import {LoaderScreen, Colors} from 'react-native-ui-lib';//eslint-disable-line

export default class LoadingScreen extends Component {

  render() {
    return (
      <LoaderScreen
        color={Colors.blue60}
        message="Loading..."
      />
    );
  }
}
