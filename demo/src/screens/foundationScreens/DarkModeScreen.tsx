import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Constants} from 'react-native-ui-lib';

class DarkModeScreen extends Component {
  state = {};
  render() {
    return (
      <View flex padding-page bg-screenBG>
        <Text h1 textColor>
          Dark Mode
        </Text>
        {Constants.isIOS ? (
          <Text marginT-s2 body textColor>
            Change to dark mode in simulator by pressing Cmd+Shift+A
          </Text>
        ) : (
          <Text marginT-s2 body textColor>Change to dark mode</Text>
        )}

        <View style={styles.moonOrSun} bg-moonOrSun/>
        <View style={[styles.mountain, styles.mountainBackground]} bg-mountainBackground/>
        <View style={[styles.mountain, styles.mountainForeground]} bg-mountainForeground/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mountain: {
    position: 'absolute',
    width: 1000,
    height: 1000,
    borderRadius: 500
  },
  mountainForeground: {
    left: -500,
    bottom: -800
  },
  mountainBackground: {
    right: -500,
    bottom: -850
  },
  moonOrSun: {
    position: 'absolute',
    right: 50,
    bottom: 350,
    width: 100,
    height: 100,
    borderRadius: 50
  }
});

export default DarkModeScreen;
