import React, {Component} from 'react';
import {View, Text} from 'react-native-ui-lib';

class DarkModeScreen extends Component {
  state = {};
  render() {
    return (
      <View flex padding-page bg-screenBG>
        <Text h1 textColor >Dark Mode</Text>
        <Text marginT-s2 body textColor>
          Change to dark mode in simulator by pressing Cmd+Shift+A
        </Text>
      </View>
    );
  }
}

export default DarkModeScreen;
